import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

const Mypage = ({ modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.user).token;
  const nickname = useSelector((state) => state.user).userInfo[0].nickname;
  const isExpired = useSelector((state) => state.user).userInfo[0].isExpired;

  const [checkPassword, setCheckPassword] = useState(false);
  const [checkRetypePassword, setCheckRetypePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [userInfo, setUserInfo] = useState({
    password: ''
  });

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
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
  };

  const handleEditRequest = () => {
    if (isExpired) {
      modal();
    } else if (userInfo.password === '') {
      setErrorMsg('수정할 비밀번호를 입력해주세요');
    } else if (checkPassword !== true) {
      setErrorMsg('비밀번호 형식을 확인해주세요');
    } else if (checkRetypePassword !== true) {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    } else {
      // JUST FOR TESTING PURPOSES
      handleNotice(true);
      handleMessage('비밀번호가 수정되었습니다.');

      /*
      axios
        .patch(process.env.REACT_APP_API_URL + '/user-info', userInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            handleNotice(true);
            handleMessage('비밀번호가 수정되었습니다.');
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
      */
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
            <InputField disabled placeholder={nickname} />
            <InputField
              type='password'
              onChange={inputCheck('password')}
              placeholder='비밀번호'
            />
            <InputField
              type='password'
              onChange={handleCheckPassword}
              placeholder='비밀번호 재확인'
            />
          </MypageInputContainer>
          <MypageButton onClick={handleEditRequest} color={Colors.lightYellow}>
            정보수정
          </MypageButton>
          <MypageButton
            onClick={handleWithdrawalRequest}
            color={Colors.darkGray}
          >
            회원탈퇴
          </MypageButton>
          <Alertbox>{errorMsg}</Alertbox>
        </MypageView>
      </div>
    </MypageWrapper>
  );
};

export default Mypage;
