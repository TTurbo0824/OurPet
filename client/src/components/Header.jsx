import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, getRequest, getHistory, getRating, getReview } from '../redux/action';
import axios from 'axios';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.div`
  display: grid;
  width: 100vw;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  border-color: white;
  border-color: ${(props) => { return props.showing !== '11.5rem' ? props.borderColor : 'white'; }};
  box-shadow: ${(props) => { return props.showing !== '11.5rem' ? 'none' : '0px 4px 4px rgba(75, 75, 75, 0.2)'; }};
  /* box-shadow:0px 4px 4px rgba(75, 75, 75, 0.2); */
  grid-template-areas: 'pages';
  grid-template-columns: 1fr;
  height: ${(props) => props.showing};
  /* height: 11.5rem; */
  ${media.tablet`border-color: ${(props) => props.borderColor}; height: 3.5rem; grid-template-areas: 'logo pages'; grid-template-columns: 50% 50%;`}
  background-color: lavender;
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
      display: none;
    }
  }
  .header-container-2 {
    grid-area: pages;
    justify-self: end;
    padding-right: 1rem;
    margin-top: 0;
    /* background-color: lime; */
    /* width: 100%; */
    &.active {
      display: flex;
    }
    &.deactive, &.close {
      /* background-color: pink; */
      padding-left: 1rem;
      display: block;
      width: 9rem;
      height: 8rem;
      flex-wrap: nowrap;
      justify-self: start;
    }
    &.deactive {
      display: none;
    }
  }
  .logo-image {
    padding-top: 0.1rem;
    width: 5.75rem;
  }
  .menu-container {
    display: flex;
    justify-content: left;
    /* background-color: ${Colors.yellow}; */
    &.active {
      display: none;
    }
    &.deactive {
      display: flex;
    }
  }
  .menu {
    margin: 1.1rem 1.5rem 0.4rem;
    font-size: 1.2rem;
    color: ${Colors.darkGray};
    cursor: pointer;
    &:hover {
      color: ${Colors.yellow};
    }
  }
`;

export const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  ${media.tablet`font-size: 0.85rem;`}
  padding-left: 0.5rem;
  color: ${Colors.gray};
  padding-bottom: 1.3rem;
  ${media.tablet`padding-bottom: 0;`}
  /* height: 1rem; */
  /* background-color: yellow; */
  &:hover {
    color: ${Colors.yellow};
  }
  &:focus {
    outline: none;
  }
`;

function Header ({ login, signup, modal, handleMessage, handleNotice, scrolled }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.user).token;
  const nickname = useSelector((state) => state.user).walkingDogUserInfo.nickname;
  const isGuest = !!nickname.includes('guest');

  // console.log(isGuest);

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
      dispatch(userLogout());
      dispatch(getRequest([]));
      dispatch(getHistory([]));
      localStorage.clear();
      handleNotice(true);
      handleMessage('게스트 모드를 종료합니다');
      window.location.replace('/search');
    } else {
      const token = isLogin;
      // console.log(token);

      axios
        .post(
          process.env.REACT_APP_API_URL + '/logout',
          { data: null },
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
          } else console.log(error.response.data.message);
        });
    }
  };

  const goToSearch = () => {
    window.location.replace('/search');
  };

  // console.log(navState);

  const goToMypage = () => {
    history.push({ pathname: '/mypage' });
  };

  return (
    <HeaderWrapper>
      <div className={`menu-container ${navState}`} onClick={handleClick}>
        {navState === 'deactive'
          ? (
            <FontAwesomeIcon className='menu' icon={faBars} />
            )
          : (
            <FontAwesomeIcon className='menu' icon={faTimes} />
            )}
      </div>
      <HeaderContainer showing={navState === 'close' ? '11.5rem' : '1rem'} borderColor={scrolled ? 'rgba(150, 150, 150, 0.2)' : 'white'}>
        <div className={`header-container-1 ${navState}`}>
          <Link to='/'>
            <img src={logo} className='logo-image' alt='logo_img' />
          </Link>
        </div>
        <div className={`header-container-2 ${navState}`}>
          <HeaderButton onClick={goToSearch}>도그워커 찾기</HeaderButton>
          {!isLogin
            ? (
              <HeaderButton onClick={login}>로그인</HeaderButton>
              )
            : (
              <HeaderButton onClick={handleLogoutRequest}>로그아웃</HeaderButton>
              )}
          {!isLogin
            ? (
              <HeaderButton onClick={signup}>회원가입</HeaderButton>
              )
            : (
              <HeaderButton onClick={goToMypage}>마이페이지</HeaderButton>
              )}
        </div>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
