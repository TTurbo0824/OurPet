import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { userLogin, resetHistory, resetRequest, getHistory, getRequest } from '../redux/action';
import logo from '../images/logo.png';
import { Colors } from '../components/utils/_var';
import { Alertbox, Backdrop, InputField } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';

export const LoginView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
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

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const LoginButton = styled.button`
  margin: 0.2rem 0.4rem 0.4rem;
  cursor: pointer;
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

export const SignupSpan = styled.span`
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
  console.log(loginInfo.email);
  const enter = (e) => {
    if (e.key === 'Enter') {
      handleLoginRequest();
    }
  };

  const handleLoginRequest = () => {
    // FOR TESTING PURPOSES
    // dispatch(userLogin('token', { email: '123', nickname: 'testuser' }));

    if (loginInfo.email === '' || loginInfo.password === '') {
      setErrorMsg('모든 항목을 입력해 주세요');
    } else {
      dispatch(getRequest([]));
      dispatch(getHistory([]));
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, loginInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            handleModal();
            handleNotice(true);
            handleMessage('로그인 성공!');
            return res.data.accessToken;
          }
        })
        .then((token) => {
          axios
            .get(process.env.REACT_APP_API_URL + '/user-info', {
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
                .get(process.env.REACT_APP_API_URL + '/my-data', {
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
          if (error.response.data.message === 'please check your password and try again') {
            setErrorMsg('잘못된 비밀번호입니다');
          }
          if (error.response.data.message === 'Invalid user') {
            setErrorMsg('등록되지 않은 이메일입니다');
          }
          console.log(error.response.data.message);
        });
    }
  };

  const goSignup = () => {
    handleModal();
    signup();
  };

  const guestLoginRequest = () => {
    // FOR TESTING PURPOSES
    // dispatch(userLogin('token', { email: '123', nickname: 'guest' }));
    // dispatch(getRequest());
    // dispatch(getHistory());

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
            // dispatch(getRequest());
            // dispatch(getHistory());
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
