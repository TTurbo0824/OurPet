import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../images/logo.png';
import { Colors } from '../components/utils/_var';
import { Alertbox, Backdrop, InputField } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';

export const SignupView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 22rem;
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

export const SignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignUpButton = styled.button`
  margin: 0.2rem 0.4rem 0rem;
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

function Signup ({ handleModal, handleMessage, handleNotice }) {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: ''
  });

  const [checkId, setCheckId] = useState('');
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkRetypePassword, setCheckRetypePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidId = (e) => {
    const regExpSpec = /^[A-Za-z0-9]+$/;
    if (e.target.value.search(/\s/) !== -1) {
      setCheckId('space');
    } else if (!regExpSpec.test(e.target.value)) {
      setCheckId('english');
    } else if (e.target.value.length < 6 || e.target.value.length > 12) {
      setCheckId('length');
    } else {
      setCheckId('ok');
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regExp.test(e.target.value)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== '' && e.target.value === userInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    if (key === 'password') {
      isValidPassword(e);
    }
    if (key === 'id') {
      isValidId(e);
    }
  };

  const handleSignupRequest = () => {
    if (userInfo.id === '' || userInfo.password === '') {
      setErrorMsg('모든 항목을 입력해 주세요');
    } else if (checkId === 'space') {
      setErrorMsg('아이디에 공백을 포함하면 안됩니다');
    } else if (checkId === 'english') {
      setErrorMsg('아이디는 영문, 숫자 조합으로만 가능합니다');
    } else if (checkId === 'length') {
      setErrorMsg('아이디는 6-12자입니다');
    } else if (checkPassword !== true) {
      setErrorMsg('비밀번호 형식을 확인해주세요');
    } else if (checkRetypePassword !== true) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else {
      handleModal();
      handleNotice(true);
      handleMessage('회원가입 성공!');

      /*
      axios
        .post(`${process.env.REACT_APP_API_URL}/signup`, userInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 201) {
            handleModal();
            handleNotice(true);
            handleMessage('회원가입 성공!');
          }
        })
        .catch((error) => {
          if (error.response.status === 409') {
            setErrorMsg('이미 가입된 아이디입니다');
          }
        });
      */
    }
  };

  return (
    <Backdrop>
      <SignupView>
        <CloseButton onClick={handleModal} />
        <img className='logo' src={logo} alt='logo' />
        <SignUpInputContainer>
          <InputField onChange={inputCheck('id')} placeholder='아이디' />
          <InputField type='password' onChange={inputCheck('password')} placeholder='비밀번호' />
          <InputField
            type='password'
            onChange={handleCheckPassword}
            placeholder='비밀번호 재확인'
          />
        </SignUpInputContainer>
        <SignUpButton onClick={handleSignupRequest}>회원가입</SignUpButton>
        <Alertbox>{errorMsg}</Alertbox>
      </SignupView>
    </Backdrop>
  );
}

export default Signup;
