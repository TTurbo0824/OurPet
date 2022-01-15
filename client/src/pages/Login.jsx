import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogin, getHistory, getRequest, getRating, getReview } from '../redux/action';
import logo from '../images/logo_text.png';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import { Logo, Alertbox, Backdrop, InputField } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';
import kakaoLogo from '../images/kakao_logo.png';
import ResetPassword, { Veri } from './ResetPassword';

const { Kakao } = window;

export const LoginView = styled.div`
  box-sizing: border-box;
  width: 18.4rem; 
  height: 21.7rem;
  ${media.tabletMini`width: 19.5rem; height: 22.5rem;`}
  ${media.tablet`width: 20rem; height: 23rem;`}
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 8px 8px grey;
  ${media.tablet`box-shadow: 10px 10px grey;`}
`;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const LoginButton = styled.button`
  cursor: pointer;
  margin: .1rem auto .3rem;
  font-size: .85rem;
  background-color: ${Colors.lightYellow};
  width: 13rem;
  height: 2.4rem;
  border-radius: 7px;
  border: none;
  color: white;
  ${media.tablet`font-size: .9rem; width: 13.2rem; height: 2.5rem;`}
  :hover {
    background-color: ${Colors.yellow};
  }
`;

const KakaoButton = styled.div`
  cursor: pointer;
  width: 13rem;
  height: 2.4rem;
  margin: .3rem auto;
  padding: .4rem 1.1rem .3rem 0;
  font-size: .85rem;
  ${media.tablet`font-size: .9rem; width: 13.2rem; height: 2.5rem;`}
  background-color: #fee500;
  border-radius: 7px;
  border: none;
  color: ${Colors.black};
  :hover {
    background-color: #edc707;
  }
  img {
    vertical-align: middle;
    margin-right: 1.8rem;
  }
`;

const KakaoContent = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: auto 1.8rem auto 0;
  font-size: .9rem;
  color: #000000 85%;
`;

const SignupSpan = styled.span`
  font-size: .8rem;
  margin: auto .2rem auto .1rem;
  text-align: right;
  color: ${(props) => props.textColor};
  cursor: ${(props) => (props.textColor === Colors.gray ? 'pointer' : 'normal')};
  :hover {
    color: ${(props) => (props.textColor === Colors.gray ? Colors.darkYellow : Colors.darkGray)};
  }
`;

function Login ({ signup, handleModal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const [resetOpen, setResetOpen] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const enter = (e) => {
    if (e.key === 'Enter') {
      handleLoginRequest();
    }
  };

  const loginRequest = (endpoint, loginInfo) => {
    dispatch(getRequest([]));
    dispatch(getHistory([]));
    dispatch(getRating([]));
    dispatch(getReview([]));
    axios
      .post(`${process.env.REACT_APP_API_URL}/${endpoint}`, loginInfo, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          handleModal();
          handleNotice(true);
          handleMessage('로그인 성공!');
          return res.data.accessToken;
        }
      })
      .then((token) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/user-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(userLogin(token, res.data.data));
            }
          })
          .then(() => {
            axios
              .get(`${process.env.REACT_APP_API_URL}/my-data`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                if (res.status === 200) {
                  dispatch(getRequest(res.data.data.allRequests));
                  dispatch(getHistory(res.data.data.allHistories));
                  dispatch(getRating(res.data.data.ratings));
                  dispatch(getReview(res.data.data.reviews));
                }
              });
          });
      })
      .catch((error) => {
        if (error.response.data.message === 'please check your password and try again') {
          setErrorMsg('잘못된 비밀번호입니다');
        } else if (error.response.data.message === 'Invalid user') {
          setErrorMsg('가입되지 않은 이메일입니다');
        } else {
          handleModal();
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
        }
      });
  };

  const handleLoginRequest = () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      setErrorMsg('모든 항목을 입력해 주세요');
    } else {
      loginRequest('login', loginInfo);
    }
  };

  const goSignup = () => {
    handleModal();
    signup();
  };

  const kakaoLogin = () => {
    Kakao.Auth.login({
      scope: 'profile_nickname, profile_image',
      success: () => {
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            const data = {
              nickname: res.kakao_account.profile.nickname,
              email: res.id.toString(),
              img: res.kakao_account.profile.profile_image_url
            };
            loginRequest('kakao', data);
          },
          fail: (error) => {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
          }
        });
      }
    });
  };

  const guestLoginRequest = () => {
    dispatch(getRating([]));
    dispatch(getReview([]));

    axios
      .get(`${process.env.REACT_APP_API_URL}/guest`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then((res) => {
        handleModal();
        handleNotice(true);
        handleMessage('30분간 체험이 가능합니다.');
        return res.data.accessToken;
      })
      .then((token) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/user-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(userLogin(token, res.data.data));
            }
          })
          .then(() => {
            axios
              .post(`${process.env.REACT_APP_API_URL}/guest`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                if (res.status === 200) {
                  dispatch(getRequest(res.data.data.allRequests));
                  dispatch(getHistory(res.data.data.allHistories));
                }
              });
          });
      })
      .catch((error) => {
        handleModal();
        handleNotice(true);
        handleMessage('오류가 발생하였습니다.');
      });
  };

  const handleResetOpen = () => {
    setResetOpen(true);
  };
  return (
    <Backdrop>
      <LoginView>
        <CloseButton onClick={handleModal} />
        <Logo src={logo} alt='logo' />
        {!resetOpen
          ? <>
            <LoginInputContainer>
              <InputField
                onChange={handleInputValue('email')}
                onKeyPress={(e) => {
                  enter(e);
                }}
                placeholder='이메일'
              />
              <InputField
                type='password'
                onChange={handleInputValue('password')}
                onKeyPress={(e) => {
                  enter(e);
                }}
                placeholder='비밀번호'
              />
            </LoginInputContainer>
            <Veri onClick={handleResetOpen}>비밀번호를 잊어버리셨나요?</Veri>
            <LoginButton onClick={handleLoginRequest}>로그인</LoginButton>
            <KakaoButton onClick={kakaoLogin}>
              <img src={kakaoLogo} alt='kakao-logo' width='20px' />
              <KakaoContent>카카오 로그인</KakaoContent>
            </KakaoButton>
            <div>
              <SignupSpan textColor={Colors.gray} onClick={goSignup}>회원가입</SignupSpan>
              <SignupSpan>|</SignupSpan>
              <SignupSpan textColor={Colors.gray} onClick={guestLoginRequest}>체험하기</SignupSpan>
            </div>
            <Alertbox>{errorMsg}</Alertbox>
          </>
          : <ResetPassword
              handleModal={handleModal}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
            />}
      </LoginView>

    </Backdrop>
  );
}

export default Login;
