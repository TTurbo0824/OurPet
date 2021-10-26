import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { userLogin } from '../redux/action';
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
  font-size: 0.85rem;
  margin: auto 0.2rem auto 0.1rem;
  text-align: right;
  color: ${(props) => props.color};
  cursor: pointer;
  :hover {
    color: ${(props) => (props.color === Colors.yellow ? Colors.darkYellow : Colors.darkGray)};
  }
`;

function Login ({ signup, handleModal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    id: '',
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

  const handleLoginRequest = () => {
    if (loginInfo.id === '' || loginInfo.password === '') {
      setErrorMsg('모든 항목을 입력해 주세요');
    } else {
      // JUST FOR TESTING PURPOSES
      dispatch(userLogin('access token', loginInfo.id));
      handleModal();
      handleNotice(true);
      handleMessage('로그인 성공!');

      /*
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, loginInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res: AxiosResponse<any>) => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('accessTokenTime', String(new Date().getTime()));
          handleModal();
          handleNotice(true);
          handleMessage('로그인 성공!');
          return res.data.accessToken;
        })
        .then((token) => {
          axios
            .get(process.env.REACT_APP_API_URL + '/user-info', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res: AxiosResponse<any>) => {
              dispatch(userLogin(token, false, res.data.data));
              localStorage.setItem('userId', JSON.stringify(res.data.data));
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
      */
    }
  };

  return (
    <Backdrop>
      <LoginView>
        <CloseButton onClick={handleModal} />
        <img className='logo' src={logo} alt='logo' />
        <LoginInputContainer>
          <InputField
            onChange={handleInputValue('id')}
            onKeyPress={(e) => {
              enter(e);
            }}
            placeholder='아이디'
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
          <SignupSpan color={Colors.darkGray}>아직 회원이 아니신가요?</SignupSpan>
          <SignupSpan color={Colors.yellow}>회원가입</SignupSpan>
        </div>
        <Alertbox>{errorMsg}</Alertbox>
      </LoginView>
    </Backdrop>
  );
}

export default Login;
