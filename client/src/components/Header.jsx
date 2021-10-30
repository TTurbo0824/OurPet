import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../redux/action';
import axios from 'axios';
import { Colors } from '../components/utils/_var';
import logo from '../images/logo.png';

const HeaderContainer = styled.div`
  display: grid;
  height: 3.5rem;
  width: 100vw;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  /* border-bottom: 1px solid; */
  border-color: ${(props) => props.borderColor};
  grid-template-areas: 'logo pages';
  grid-template-columns: 50% 50%;
`;

const HeaderWrapper = styled.div`
  .header-container-1 {
    grid-area: logo;
    text-align: left;
    padding-left: 1rem;
    max-width: 8rem;
  }
  .header-container-2 {
    grid-area: pages;
    justify-self: end;
    padding-right: 1rem;
    margin-top: 0rem;
  }
  .logo-image {
    padding-top: 0.1rem;
    width: 5.75rem;
  }
`;

export const HeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: 'Noto Sans KR', sans-serif;
  padding-left: 0.5rem;
  color: ${Colors.gray};

  &:hover {
    color: ${Colors.yellow};
  }
  &:focus {
    outline: none;
  }
`;

function Header ({ login, signup, modal, handleMessage, handleNotice, scrolled }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user).token;
  const isExpired = useSelector((state) => state.user).userInfo.isExpired;

  const handleLogoutRequest = () => {
    const token = isLogin;
    console.log(token);
    if (isExpired) {
      modal();
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + '/logout', { data: null }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then(() => {
          dispatch(userLogout());
          localStorage.clear();
          handleNotice(true);
          handleMessage('로그아웃 성공!');
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContainer borderColor={scrolled ? 'rgba(150, 150, 150, 0.2)' : 'white'}>
        <div className='header-container-1'>
          <Link to='/'>
            <img src={logo} className='logo-image' alt='logo_img' />
          </Link>
        </div>
        <div className='header-container-2'>
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
              <Link to='/mypage'>
                <HeaderButton>마이페이지</HeaderButton>
              </Link>
              )}
        </div>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
