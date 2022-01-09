import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../images/logo_text.png';
import { Colors } from '../components/utils/_var';
import { media } from '../components/utils/_media-queries';
import { Logo, Alertbox, Backdrop } from '../components/UserComponents';
import CloseButton from '../components/CloseButton';

const SignupView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 25.5rem;
  ${media.tabletMini`width: 20rem; height: 26rem;`}
  ${media.tablet`width: 21rem; height: 27rem;`}
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: .5rem;
  box-shadow: 8px 8px grey;
  ${media.tablet`box-shadow: 10px 10px grey;`}
  .logo {
    width: 6.75rem;
    margin: .85rem auto .5rem;
    ${media.tabletMini`width: 7rem; margin: .9rem auto .5rem;`}
    ${media.tablet`width: 7.25rem; margin: 1rem auto .8rem;`}
  }
  .veri {
    cursor: pointer;
    font-size: .75rem;
    margin-top: -.2rem;
    margin-bottom: .5rem;
    text-decoration: underline;
    color: ${Colors.darkGray};
    :hover {
      color: ${Colors.black};
    }
  }
`;

const SignUpInputField = styled.input`
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  padding: .5rem 1rem;
  margin-bottom: .5rem;
  color: ${Colors.darkGray};
  width: 14rem;
  height: 1.75rem;
  ${media.tabletMini`width: 14.2rem;`}
  ${media.tablet`width: 15rem; height: 1.9rem;`}
  :focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;

const SignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpButton = styled.button`
  margin: .2rem .4rem 0rem;
  cursor: pointer;
  background-color: ${Colors.lightYellow};
  font-size: .85rem;
  width: 14rem;
  height: 2.4rem;
  border-radius: 7px;
  border: none;
  color: white;
  ${media.tabletMini`width: 14.2rem;`}
  ${media.tablet`width: 15rem; height: 2.5rem; font-size: .9rem;`}
  :hover {
    background-color: ${Colors.yellow};
  }
`;

const IsUser = styled.div`
  margin-top: .3rem;
  color: ${Colors.darkGray};
  font-size: .83rem;
  ${media.tablet`font-size: .85rem;`}
  .login {
    cursor: pointer;
    color: ${Colors.yellow};
    :hover {
      color: ${Colors.darkYellow};
    }
  }
`;

function Signup ({ login, handleModal, handleMessage, handleNotice }) {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    password: '',
    verified: false
  });

  const [checkNickname, setCheckNickname] = useState('');
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState('');
  const [checkRetypePassword, setCheckRetypePassword] = useState(false);
  const [veriCode, setVeriCode] = useState(null);
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
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;
    if (e.target.value.length < 8 || e.target.value.length > 12) {
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

  const handleCheckVeriCode = (e) => {
    if (Number(e.target.value) === veriCode) {
      setUserInfo({ ...userInfo, verified: true });
    } else {
      setUserInfo({ ...userInfo, verified: false });
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
      setErrorMsg('비밀번호는 8-12자입니다');
    } else if (checkPassword !== 'ok') {
      setErrorMsg('비밀번호 형식을 확인해주세요');
    } else if (checkRetypePassword !== true) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else if (!userInfo.verified) {
      setErrorMsg('이메일을 확인해 인증코드를 입력해주세요.');
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
          } else {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
          }
        });
    }
  };

  const sendEmail = () => {
    if (!checkEmail || !userInfo.email) {
      setErrorMsg('올바른 이메일 주소를 입력해주세요');
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth`, { email: userInfo.email }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            setVeriCode(res.data.data);
            setErrorMsg('인증 이메일이 발송되었습니다');
          }
        })
        .catch((error) => {
          handleModal();
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
        });
    }
  };

  const goLogin = () => {
    handleModal();
    login();
  };

  return (
    <Backdrop>
      <SignupView>
        <CloseButton onClick={handleModal} />
        <Logo src={logo} alt='logo' />
        <SignUpInputContainer>
          <SignUpInputField onChange={inputCheck('nickname')} placeholder='닉네임 (3-8자)' />
          <SignUpInputField onChange={inputCheck('email')} placeholder='이메일' />
          <div className='veri' onClick={sendEmail}>이메일 인증</div>
          <SignUpInputField onChange={handleCheckVeriCode} placeholder='인증코드 입력' />
          <SignUpInputField type='password' onChange={inputCheck('password')} placeholder='비밀번호 (영문, 숫자 포함 8-12자)' />
          <SignUpInputField
            type='password'
            onChange={handleCheckPassword}
            placeholder='비밀번호 재확인'
          />
        </SignUpInputContainer>
        <SignUpButton onClick={handleSignupRequest}>회원가입</SignUpButton>
        <IsUser>이미 회원이신가요? <span className='login' onClick={goLogin}>로그인 하기</span></IsUser>
        <Alertbox>{errorMsg}</Alertbox>
      </SignupView>
    </Backdrop>
  );
}

export default Signup;
