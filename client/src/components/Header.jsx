import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, getRequest, getHistory, getRating, getReview } from '../redux/action';
import axios from 'axios';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import logo from '../images/logo_text.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.div`
  display: grid;
  width: 100vw;
  align-items: start;
  ${media.tablet`justify-content: center; align-items: center;`}
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  border-color: ${(props) => props.borderColor};
  grid-template-areas: 'pages';
  grid-template-columns: 1fr;
  height: ${(props) => props.showing};
  ${media.tablet`height: 3.5rem; grid-template-areas: 'logo pages'; grid-template-columns: 50% 50%;`}
  background-color: white;
`;

const HeaderWrapper = styled.div`
  .header-container-1 {
    grid-area: logo;
    text-align: left;
    padding-left: 1rem;
    max-width: 8rem;
    &.active {
      display: flex;
    }
    &.deactive, &.close  {
      display: flex;
      position: fixed;
      margin: 0rem auto;
      top: 0;
      right: 0;
      left: 0;
    }
  }
  .header-container-2 {
    grid-area: pages;
    justify-self: end;
    padding-right: 1rem;
    margin-top: 2.5rem;
    ${media.tablet`margin-top: 0;`}
    &.active {
      display: flex;
    }
    &.deactive, &.close {
      padding-left: 1rem;
      display: block;
      width: 9rem;
      height: 20rem;
      flex-wrap: nowrap;
      justify-self: start;
    }
    &.deactive {
      display: none;
    }
  }
  .logo-image {
    cursor: pointer;
    width: 6.25rem;
    padding-top: 1.1rem;
    ${media.tablet`padding-top: .2rem; width: 6.5rem;`}
  }
  .menu-container {
    display: flex;
    justify-content: left;
    &.active {
      display: none;
    }
    &.deactive {
      display: flex;
    }
  }
  .menu {
    margin: 1.1rem 1.5rem .4rem;
    font-size: 1.2rem;
    color: ${Colors.darkGray};
    cursor: pointer;
    :hover {
      color: ${Colors.yellow};
    }
  }
`;

const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  ${media.tablet`font-size: .85rem;`}
  padding-left: .5rem;
  color: ${Colors.darkGray};
  ${media.tablet`color: ${Colors.gray};`}
  padding-bottom: 1.75rem;
  ${media.tablet`padding-bottom: 0;`}
  :hover {
    color: ${Colors.yellow};
  }
  :focus {
    outline: none;
  }
`;

const HLine = styled.div`
  display:  ${(props) => props.showing};
  width: 95vw;
  margin: 0 auto ;
  margin-bottom: 1.75rem;
  border-bottom: 1px solid rgb(175, 175, 175, 0.4);
`;

function Header ({ login, signup, modal, handleMessage, handleNotice, scrolled }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user).token;
  const nickname = useSelector((state) => state.user).walkingDogUserInfo.nickname;
  const isGuest = !!nickname.includes('guest#');
  const [navState, setNavState] = useState('active');

  useEffect(() => window.addEventListener('resize', maintainNavState));

  useEffect(() => {
    if (window.innerWidth < 768) setNavState('deactive');
  }, []);

  const handleClick = () => {
    if (navState === 'active') setNavState('active');
    else if (navState === 'deactive') setNavState('close');
    else setNavState('deactive');
  };

  const maintainNavState = () => {
    if (window.innerWidth >= 768) {
      if (navState === 'active') setNavState('active');
    } else setNavState('deactive');
  };

  const handleLogoutRequest = () => {
    if (isGuest) {
      modal();
    } else {
      const token = isLogin;

      axios
        .post(`${process.env.REACT_APP_API_URL}/logout`, { data: null },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        )
        .then((res) => {
          if (res.status === 205) {
            dispatch(userLogout());
            dispatch(getRequest([]));
            dispatch(getHistory([]));
            dispatch(getRating([]));
            dispatch(getReview([]));
            localStorage.clear();
            handleNotice(true);
            handleMessage('로그아웃 성공!');
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            modal();
          } else {
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
          }
        });
    }
  };

  const goToSearch = () => {
    window.location.replace('/search');
  };

  const goToMypage = () => {
    if (navState === 'close') setNavState('deactive');
    window.location.replace('/mypage');
  };

  const goToMain = () => {
    if (navState === 'close') setNavState('deactive');
    window.location.replace('/');
  };

  return (
    <HeaderWrapper>
      <div className={`menu-container ${navState}`} onClick={handleClick}>
        {navState === 'deactive'
          ? <FontAwesomeIcon className='menu' icon={faBars} />
          : <FontAwesomeIcon className='menu' icon={faTimes} />}
      </div>
      <HeaderContainer showing={navState === 'close' ? '100vh' : '1rem'} borderColor={scrolled ? 'rgba(150, 150, 150, 0.2)' : 'white'}>
        <div className={`header-container-1 ${navState}`}>
          <img src={logo} onClick={goToMain} className='logo-image' alt='logo_img' />
        </div>
        <div className={`header-container-2 ${navState}`}>
          <HeaderButton onClick={goToSearch}>도그워커 찾기</HeaderButton>
          <HLine showing={navState !== 'close' ? 'none' : 'flex'} />
          {!isLogin
            ? <HeaderButton onClick={login}>로그인</HeaderButton>
            : <HeaderButton onClick={handleLogoutRequest}>로그아웃</HeaderButton>}
          <HLine showing={navState !== 'close' ? 'none' : 'flex'} />
          {!isLogin
            ? <HeaderButton onClick={signup}>회원가입</HeaderButton>
            : <HeaderButton onClick={goToMypage}>마이페이지</HeaderButton>}
          <HLine showing={navState !== 'close' ? 'none' : 'flex'} />
        </div>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
