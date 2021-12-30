import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/Landing/LadingPage';
import Mainpage from './pages/Mainpage/Mainpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Myinfo from './pages/Mypage/Myinfo/Myinfo';
import Myrequest from './pages/Mypage/Myrequest/Myrequest';
import Myhistory from './pages/Mypage/Myhistory/Myhistory';
import Modal from './components/Modal';
import Notification from './components/Notification';
import DogWalkerPage from './pages/Dogwalker/DogWalkerPage';
import MoveTop from './components/MoveTop';

const AppWrapper = styled.div`
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .App {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .fixed-container {
    position: fixed;
    top: 0;
    z-index: 10;
    height: 3.5rem;
    background-color: white;
    /* opacity: 0.7; */
  }
  .space {
    margin-bottom: 4.7rem;
  }
  input:focus, button:focus, select:focus {
    outline:  none;
  }
`;

function App () {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [openNotice, setOpenNotice] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLogin = useSelector((state) => state.user).token;

  useEffect(() => {
    const handleScrolled = () => {
      if (!scrolled && window.scrollY > 15) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 15) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrolled);
    return () => {
      window.removeEventListener('scroll', handleScrolled);
    };
  }, [scrolled]);

  const handleLoginModalOpen = () => {
    setOpenLogin(true);
  };
  const handleSignupModalOpen = () => {
    setOpenSignup(true);
  };
  const handleLoginModalClose = () => {
    setOpenLogin(false);
  };
  const handleSignupModalClose = () => {
    setOpenSignup(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleMessage = (msg) => {
    setMessage(msg);
  };
  const handleNotice = (boolean) => {
    setOpenNotice(boolean);
  };
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <BrowserRouter>
      <AppWrapper>
        <div className='App'>
          <div className='fixed-container'>
            <Header
              login={handleLoginModalOpen}
              signup={handleSignupModalOpen}
              modal={handleModalOpen}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
              scrolled={scrolled}
            />
          </div>
          <div className='space' />
          {openModal
            ? (
              <Modal
                handleModal={handleModalClose}
                login={handleLoginModalOpen}
              />
              )
            : null}
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/search' component={Mainpage} />
            <Route path='/mypage'>
              {isLogin
                ? (
                  <Myinfo
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                  )
                : (
                  <Redirect to='/' />
                  )}
            </Route>
            <Route path='/myrequest'>
              <Myrequest
                modal={handleModalOpen}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
            </Route>
            <Route path='/myhistory'>
              <Myhistory
                modal={handleModalOpen}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
            </Route>
            <Route
              path='/dogwalker:id'
              render={() => (
                <DogWalkerPage
                  modal={handleModalOpen}
                  handleMessage={handleMessage}
                  handleNotice={handleNotice}
                />
              )}
            />
          </Switch>
          {openNotice
            ? (
              <Notification
                message={message}
                handleNotice={handleNotice}
                handleMessage={handleMessage}
                modal={handleModalOpen}
              />
              )
            : null}
          {scrolled ? <MoveTop moveToTop={moveToTop} /> : null}
          <Footer />
          {openSignup
            ? (
              <Signup
                handleModal={handleSignupModalClose}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
              )
            : null}
          {openLogin
            ? (
              <Login
                signup={handleSignupModalOpen}
                handleModal={handleLoginModalClose}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
              )
            : null}
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
