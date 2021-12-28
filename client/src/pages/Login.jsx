import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogin, getHistory, getRequest, resetHistory, resetRequest, getRating, getReview } from '../redux/action';
import logo from '../images/logo.png';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import { Alertbox, Backdrop, InputField } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';
import kakaoLogo from '../images/kakao_logo.png';

const { Kakao } = window;

const LoginView = styled.div`
  box-sizing: border-box;
  width: 20rem;
  height: 24rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
  .logo {
    width: 7.5rem;
    margin: 0.7rem auto 1rem;
  }
`;

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LoginButton = styled.button`
  cursor: pointer;
  margin: 0.1rem auto 0.3rem;
  font-size: 0.9rem;
  background-color: ${Colors.lightYellow};
  width: 13.2rem;
  height: 2.5rem;
  border-radius: 7px;
  border: none;
  color: white;
  :hover {
    background-color: ${Colors.yellow};
  }
`;

const KakaoButton = styled.div`
  cursor: pointer;
  width: 13.2rem;
  height: 2.5rem;
  margin: 0.3rem auto;
  padding: 0.3rem 0.2rem 0.3rem 0;
  /* ${media.tabletMini`padding: .37rem .2rem .37rem 0;`} */
  padding: 0.4rem 1.1rem 0.3rem 0;
  font-size: 0.9rem;
  background-color: #fee500;
  border-radius: 7px;
  border: none;
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
  font-size: 0.9rem;
  ${media.tablet`font-size: .9rem;`}
  color: #000000 85%;
`;

const SignupSpan = styled.span`
  font-size: 0.8rem;
  margin: auto 0.2rem auto 0.1rem;
  text-align: right;
  color: ${Colors.gray};
  color: ${(props) => props.textColor};
  cursor: ${(props) => (props.textColor === Colors.gray ? 'pointer' : 'normal')};
  :hover {
    color: ${(props) => (props.textColor === Colors.gray ? Colors.darkYellow : Colors.darkGray)};
  }
`;

function Login ({ signup, handleModal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  // dispatch(resetRequest());
  // dispatch(getHistory());

  // const defaultHistory = useSelector((state) => state.history).dogWalkerHistory;
  // const defaultRequest = useSelector((state) => state.request).dogWalkerRequest;

  // console.log(defaultHistory);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  // console.log(loginInfo.email);
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
          setErrorMsg('등록되지 않은 이메일입니다');
        } else {
          setErrorMsg('오류가 발생했습니다.');
          console.log('error: ', error.response.data.message);
        }
      });
  };

  const handleLoginRequest = () => {
    // FOR TESTING PURPOSES
    // dispatch(userLogin('token', { email: '123', nickname: 'testuser' }));

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
            // console.log(data);

            loginRequest('kakao', data);
          },
          fail: (error) => {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
            console.log('error: ', error.response.data.message);
          }
        });
      }
    });
  };

  const guestLoginRequest = () => {
    // FOR TESTING PURPOSES
    // dispatch(userLogin('token', { email: '123', nickname: 'guest' }));

    dispatch(resetRequest());
    dispatch(resetHistory());
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
            dispatch(userLogin(token, res.data.data));
          })
          .then(() => {
            axios
              .post(`${process.env.REACT_APP_API_URL}/guest`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
          });
      })
      .catch((error) => {
        handleMessage('오류가 발생하였습니다.');
        console.log('error: ', error.response.data.message);
      });
  };

  return (
    <Backdrop>
      <LoginView>
        <CloseButton onClick={handleModal} />
        <img className='logo' src={logo} alt='logo' />
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
      </LoginView>
    </Backdrop>
  );
}

export default Login;
