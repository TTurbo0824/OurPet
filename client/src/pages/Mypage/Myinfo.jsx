import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editInfo } from '../../redux/action';
import styled from 'styled-components';
import axios from 'axios';
import { Colors } from '../../components/utils/_var';
import { Alertbox, InputField } from '../../components/UserComponents';

export const MypageWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 10.9rem);
  }
`;

export const MypageView = styled.div`
  margin: 4rem auto;
  padding-top: 0.7rem;
  box-sizing: border-box;
  width: 19rem;
  height: 15rem;
  background-color: white;
  position: relative;
  text-align: center;

  input:disabled {
    background: ${Colors.lightGray};
    color: ${Colors.gray};
  }
`;

export const MypageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MypageButton = styled.button`
  cursor: pointer;
  width: 5.8rem;
  margin: 0.3rem 0.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 7px;
  border: 2px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  font-size: 0.85rem;
  color: white;
  :hover {
    background-color: ${Colors.yellow};
    border-color: ${Colors.yellow};
  }
  &:last-of-type {
    border: 2px solid ${Colors.gray};
    background-color: ${Colors.gray};
    color: white;
  }
  &:last-of-type:hover {
    background-color: white;
    border-color: ${Colors.black};
    background-color: ${Colors.black};
  }
`;

// ==================================================================
//                               TO DO
// ==================================================================
//  1. 게스트 모드일 때, 회원 정보 수정 & 회원 탈퇴 기능 disable
//  2. 회원 정보 수정 & 탈퇴 기능 서버와 연결
//  3.
//

function Mypage ({ modal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user).token;
  const userInfo = useSelector((state) => state.user).userInfo;
  const { email, nickname } = userInfo;
  const isExpired = useSelector((state) => state.user).userInfo.isExpired;
  const isGuest = useSelector((state) => state.user).userInfo.nickname.includes('guest#');
  const [checkNickname, setCheckNickname] = useState('ok');
  const [checkPassword, setCheckPassword] = useState('ok');
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [myInfo, setMyInfo] = useState({
    nickname: '',
    password: ''
  });

  const handleInputValue = (key) => (e) => {
    setMyInfo({ ...myInfo, [key]: e.target.value || '' });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`,.=]/;
    const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if (e.target.value.length === 0) {
      if (checkRetypePassword) {
        setCheckNickname('ok');
        setErrorMsg('');
      } else {
        setCheckNickname('닉네임을 입력해주세요');
      }
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('올바른 한글 형식을 따라주세요');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('닉네임에 특수문자를 포함하면 안됩니다');
    } else if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('닉네임에 공백을 포함하면 안됩니다');
    } else if (e.target.value.length < 3 || e.target.value.length > 8) {
      setCheckNickname('닉네임은 3-8자입니다');
    } else {
      setCheckNickname('ok');
      if (myInfo.password === '' && myInfo.passwordRetype === '') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
      }
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;

    if (e.target.value === '') {
      if (myInfo.passwordRetype === '' && checkNickname !== 'ok') {
        setCheckPassword('empty');
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype === '' && checkNickname === 'ok') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
        setErrorMsg('');
      } else {
        setCheckPassword('empty');
        setCheckRetypePassword(false);
      }
    } else if (e.target.value !== '') {
      if (myInfo.passwordRetype === e.target.value) {
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype !== '' && myInfo.passwordRetype !== e.target.value) {
        setCheckRetypePassword(false);
      }
      if (!regExp.test(e.target.value)) {
        setCheckPassword('no');
      } else {
        setCheckPassword('ok');
      }
    } else {
      setCheckPassword('no');
    }
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== '' && e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
      // 비밀번호를 완벽하게 입력했다면 닉네임을 수정할 필요없음
      if (checkNickname === '닉네임을 입력해주세요') {
        setCheckNickname('ok');
      }
    } else if (e.target.value === '' && myInfo.password === '') {
      setCheckRetypePassword(true);
    } else if (e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    setErrorMsg('');
    if (key === 'nickname') {
      isValidNickname(e);
    }
    if (key === 'password') {
      isValidPassword(e);
    }
    if (key === 'passwordRetype') {
      handleCheckPassword(e);
    }
  };

  console.log(checkNickname, checkPassword, checkRetypePassword);

  const handleEditRequest = () => {
    // console.log(myInfo);
    if (checkPassword === 'no') {
      setErrorMsg('올바른 비밀번호가 아닙니다');
    } else if (!checkRetypePassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else if (myInfo.nickname === '' && myInfo.password === '') {
      setErrorMsg('변경할 정보를 입력해주세요');
    } else if (checkNickname !== 'ok') {
      setErrorMsg(checkNickname);
    } else if (
      checkPassword !== 'ok' ||
      checkNickname !== 'ok'
    ) {
      setErrorMsg('변경할 정보를 올바르게 입력해주세요');
    } else {
      if (myInfo.nickname === '') setMyInfo({ ...myInfo, nickname: userInfo.nickname });
      setErrorMsg('');
      dispatch(editInfo(myInfo));

      // axios
      //   .patch(process.env.REACT_APP_API_URL + '/user-info', myInfo, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       handleNotice(true);
      //       handleMessage('회원정보가 수정되었습니다.');
      //       if (myInfo.nickname === '') {
      //         myInfo.nickname = nickname;
      //       } else {
      //         myInfo.nickname = myInfo.nickname + `#${id}`;
      //       }
      //       if (myInfo.password === '') {
      //         myInfo.password = '';
      //       }
      //       dispatch(editInfo(myInfo));
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //   });
    }
  };

  const handleWithdrawalRequest = () => {
    if (isExpired) {
      modal();
    } else {
      handleNotice(true);
      handleMessage('정말 탈퇴하시겠습니까?');
    }
  };

  return (
    <MypageWrapper>
      <div className='main'>
        <MypageView>
          <MypageInputContainer>
            <InputField
              disabled={isGuest ? 'disabled' : null}
              onChange={inputCheck('nickname')}
              placeholder={nickname}
            />
            <InputField disabled placeholder={email} />
            <InputField
              disabled={isGuest ? 'disabled' : null}
              type='password'
              placeholder='비밀번호 (영문, 숫자 반드시 포함)'
              onChange={inputCheck('password')}
            />
            <InputField
              disabled={isGuest ? 'disabled' : null}
              type='password'
              placeholder='비밀번호 재확인'
              onChange={handleCheckPassword}
            />
          </MypageInputContainer>
          <MypageButton onClick={handleEditRequest} color={Colors.lightYellow}>
            정보수정
          </MypageButton>
          <MypageButton onClick={handleWithdrawalRequest} color={Colors.darkGray}>
            회원탈퇴
          </MypageButton>
          <Alertbox>{errorMsg}</Alertbox>
        </MypageView>
      </div>
    </MypageWrapper>
  );
}

export default Mypage;
