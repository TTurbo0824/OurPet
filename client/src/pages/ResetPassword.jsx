import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../components/utils/_var';
import { Alertbox, InputField, PasswordField } from '../components/UserComponents';
import { LoginButton } from './Login';

export const Veri = styled.div`
  cursor: pointer;
  font-size: .75rem;
  margin-top: -.2rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  color: ${Colors.darkGray};
  :hover {
    color: ${Colors.black};
  }
`;

const ResetWrapper = styled.div`
  .instruction {
    font-size: .9rem;
    white-space: pre-line;
    color: ${Colors.black};
    margin-bottom: 1.1rem;
  }
  .top-space {
    height: .25rem;
  }
`;

function ResetPassword ({ handleModal, handleNotice, handleMessage }) {
  const [curState, setCurState] = useState(null);
  const [userInfo, setUserInfo] = useState({ email: '', password: '', passwordRetype: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [veriCode, setVeriCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkPassword, setCheckPassword] = useState('empty');
  const [checkRetypePassword, setCheckRetypePassword] = useState(false);

  const { email, password, passwordRetype } = userInfo;
  const handleStateChange = () => {
    if (!email) setErrorMsg('이메일을 입력해주세요');
    else if (curState !== 'codeSent') setErrorMsg('인증코드를 요청해주세요.');
    else if (isVerified) {
      setCurState('ready');
      setErrorMsg('');
    } else {
      setErrorMsg('잘못된 인증코드입니다.');
    }
  };

  const handleCheckVeriCode = (e) => {
    if (e.target.value === veriCode) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  const sendEmail = () => {
    if (!email) {
      setErrorMsg('이메일을 입력해주세요');
    } else if (curState === 'codeSent') {
      setErrorMsg('이미 이메일이 발송되었습니다');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/reset-password`,
          { email: email },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setVeriCode(res.data.data);
            setCurState('codeSent');
            setErrorMsg('인증 이메일이 발송되었습니다');
          }
        })
        .catch((error) => {
          if (error.response.data.message === 'Invalid user') {
            setErrorMsg('가입되지 않은 이메일입니다');
          } else {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
          }
        });
    }
  };

  const isValidPassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;

    if (e.target.value === '') {
      setCheckPassword('empty');
      setCheckRetypePassword(false);
    } else if (e.target.value !== '') {
      if (!regExp.test(e.target.value)) {
        if (e.target.value.length < 8 || e.target.value.length > 12) {
          setCheckPassword('length');
        } else {
          setCheckPassword('no');
        }
      } else {
        setCheckPassword('ok');
      }

      if (passwordRetype === e.target.value) {
        setCheckRetypePassword(true);
      } else if (passwordRetype !== '' && passwordRetype !== e.target.value) {
        setCheckRetypePassword(false);
      }
    } else {
      setCheckPassword('no');
    }
  };

  const handleCheckPassword = (e) => {
    setUserInfo({ ...userInfo, passwordRetype: e.target.value });

    if (e.target.value !== '' && e.target.value === password) {
      setCheckRetypePassword(true);
    } else if (e.target.value === '' && password === '') {
      setCheckRetypePassword(true);
    } else if (e.target.value === password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  const resetPassword = () => {
    if (checkPassword === 'empty') {
      setErrorMsg('비밀번호를 입력해주세요');
    } else if (checkPassword === 'length') {
      setErrorMsg('비밀번호는 8-12자입니다');
    } else if (checkPassword === 'no') {
      setErrorMsg('올바른 비밀번호가 아닙니다');
    } else if (!checkRetypePassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else {
      setErrorMsg('');
      const payload = {
        email: email,
        password: password
      };
      axios
        .patch(process.env.REACT_APP_API_URL + '/user-password', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            handleModal();
            handleNotice(true);
            handleMessage('비밀번호가 수정되었습니다.');
          }
        })
        .catch((error) => {
          handleModal();
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
        });
    }
  };

  return (

    <ResetWrapper>
      {curState !== 'ready'
        ? <>
          <div className='instruction'>
            가입시 등록하신 이메일을 통해{'\n'}
            재설정에 필요한 인증코드를 보내드립니다.
          </div>
          <InputField
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder='이메일'
          />
          <Veri onClick={sendEmail}>인증코드 전송</Veri>
          <InputField
            onChange={handleCheckVeriCode}
            type='password'
            placeholder='인증코드 입력'
          />
          <LoginButton onClick={handleStateChange}>확인</LoginButton>
          <Alertbox>{errorMsg}</Alertbox>
        </>
        : <>
          <div className='top-space' />
          <div className='instruction'>
            새로운 비밀번호를 입력해주세요.
          </div>
          <PasswordField
            onChange={isValidPassword}
            type='password'
            placeholder='비밀번호 (영문, 숫자 포함 8-12자)'
          />
          <PasswordField
            onChange={handleCheckPassword}
            type='password'
            placeholder='비밀번호 재확인'
          />
          <LoginButton onClick={resetPassword}>비밀번호 재설정하기</LoginButton>
          <Alertbox>{errorMsg}</Alertbox>
        </>}
    </ResetWrapper>
  );
}

export default ResetPassword;
