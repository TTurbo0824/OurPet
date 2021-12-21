import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../images/logo.png';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import { Alertbox, Backdrop, InputField } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';

export const SignupView = styled.div`
  box-sizing: border-box;
  width: 20.7rem;
  height: 25rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
  .logo {
    width: 7.5rem;
    margin: 0.4rem auto 1rem;
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
  &:hover {
    background-color: ${Colors.yellow};
  }
`;

function Signup ({ handleModal, handleMessage, handleNotice }) {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    password: ''
  });

  const [checkNickname, setCheckNickname] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState('');
  const [checkRetypePassword, setCheckRetypePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`,.=]/;
    const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;

    if (e.target.value.includes('guest#')) {
      setCheckNickname('guest');
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('korean');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('special');
    } else if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('space');
    } else if (e.target.value.length < 3 || e.target.value.length > 8) {
      setCheckNickname('length');
    } else {
      setCheckNickname('ok');
    }
  };

  const isValidEmail = (e) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (e.target.value.length < 8 || e.target.value.length > 10) {
      setCheckPassword('length');
    } else if (regExp.test(e.target.value)) {
      setCheckPassword('ok');
    } else {
      setCheckPassword('fail');
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
    if (key === 'nickname') {
      isValidNickname(e);
    }
    if (key === 'email') {
      isValidEmail(e);
    }
    if (key === 'password') {
      isValidPassword(e);
    }
  };

  const handleSignupRequest = () => {
    if (userInfo.id === '' || userInfo.email === '' || userInfo.password === '') {
      setErrorMsg('모든 항목을 입력해 주세요');
    } else if (checkNickname === 'guest') {
      setErrorMsg('해당 닉네임은 사용하실 수 없습니다');
    } else if (checkNickname === 'space') {
      setErrorMsg('닉네임에 공백을 포함하면 안됩니다');
    } else if (checkNickname === 'korean') {
      setErrorMsg('올바른 한글 형식을 따라주세요');
    } else if (checkNickname === 'special') {
      setErrorMsg('닉네임에 특수문자를 포함하면 안됩니다');
    } else if (checkNickname === 'length') {
      setErrorMsg('닉네임은 3-8자입니다');
    } else if (!checkEmail) {
      setErrorMsg('이메일 형식을 확인해주세요');
    } else if (checkPassword === 'length') {
      setErrorMsg('비밀번호는 8-10자입니다');
    } else if (checkPassword !== 'ok') {
      setErrorMsg('비밀번호 형식을 확인해주세요');
    } else if (checkRetypePassword !== true) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else {
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
          if (error.response.data.message === 'conflict: email & nickname') {
            setErrorMsg('이미 가입된 닉네임과 이메일입니다');
          } else if (error.response.data.message === 'conflict: email') {
            setErrorMsg('이미 가입된 이메일입니다');
          } else if (error.response.data.message === 'conflict: nickname') {
            setErrorMsg('이미 가입된 닉네임입니다');
          } else console.log(error.response.data.message);
        });
    }
  };

  return (
    <Backdrop>
      <SignupView>
        <CloseButton onClick={handleModal} />
        <img className='logo' src={logo} alt='logo' />
        <SignUpInputContainer>
          <InputField onChange={inputCheck('nickname')} placeholder='닉네임 (3-8자)' />
          <InputField onChange={inputCheck('email')} placeholder='이메일' />
          <InputField type='password' onChange={inputCheck('password')} placeholder='비밀번호 (영문, 숫자 반드시 포함)' />
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
