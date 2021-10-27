import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useJwt } from 'react-jwt';
import Header from './components/Header';
import Footer from './components/Footer';
import Mainpage from './pages/Mainpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage/Myinfo';
import Modal from './components/Modal';
import Notification from './components/Notification';
import { tokenExpired } from './redux/action';

const AppWrapper = styled.div`
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .App {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .space {
    margin-bottom: 3rem;
  }
`;

function App () {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [openNotice, setOpenNotice] = useState(false);
  const isLogin = useSelector((state) => state.user).token;
  const token = isLogin;
  const userId = useSelector((state) => state.user).userID;
  const { decodedToken, isExpired } = useJwt(token);

  // console.log(decodedToken, isExpired);

  if (decodedToken && isExpired) {
    dispatch(tokenExpired(token, true, userId));
  }

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

  return (
    <BrowserRouter>
      <AppWrapper>
        <div className='App'>
          <Header
            login={handleLoginModalOpen}
            signup={handleSignupModalOpen}
            modal={handleModalOpen}
            handleMessage={handleMessage}
            handleNotice={handleNotice}
          />
          <div className='space' />
          {openModal ? <Modal handleModal={handleModalClose} login={handleLoginModalOpen} /> : null}
          <Switch>
            <Route exact path='/' component={Mainpage} />
            <Route path='/mypage'>
              {isLogin
                ? (
                  <Mypage
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                  )
                : (
                  <Redirect to='/' />
                  )}
            </Route>
          </Switch>
          {openNotice
            ? (
              <Notification
                message={message}
                handleNotice={handleNotice}
                handleMessage={handleMessage}
              />
              )
            : null}
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
