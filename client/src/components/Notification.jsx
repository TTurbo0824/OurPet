import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cancelDogwalker, deleteReview } from '../redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Colors } from './utils/_var';
require('dotenv').config();

const { Kakao } = window;

// ==================================================================
//                               TO DO
// ==================================================================
//  1. CSS 점검
//

export const NoticeBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  height: 100vh;
`;

export const NoticeView = styled.div`
  box-sizing: border-box;
  position: relative;
  text-align: center;
  width: 16.5rem;
  height: 9.5rem;
  background-color: rgb(255, 255, 255);
  color: ${Colors.darkGray};
  box-shadow: 10px 10px grey;
  padding: 0.8rem;
`;

export const Message = styled.div`
  margin-top: ${(props) => props.topMargin};
  font-size: 1rem;
`;

export const NoticeButton = styled.button`
  margin-top: 1rem;
  background-color: ${Colors.lightYellow};
  border: none;
  border-radius: 10px;
  height: 1.7rem;
  font-size: 0.9rem;
  width: 7rem;
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${Colors.darkYellow};
  }
`;

export const NoticeClose = styled.button`
  margin-top: 1rem;
  background-color: ${Colors.lightYellow};
  border: none;
  border-radius: 10px;
  width: 7rem;
  height: 1.7rem;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${Colors.darkYellow};
  }
`;

export const CloseIcon = styled.div`
  display: flex;
  justify-content: right;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

function Notification ({ message, handleNotice, handleMessage, modal }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user).token;
  const email = useSelector((state) => state.user).walkingDogUserInfo.email;
  const kakaoUser = !email.includes('@');
  console.log(kakaoUser);

  const [deleteIds, setDeleteIds] = useState([]);

  const withdrawalRequest = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/withdrawal`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          handleMessage('회원탈퇴가 완료되었습니다.');
          localStorage.clear();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleNotice(false);
          modal();
        } else {
          handleMessage('오류가 발생하였습니다.');
          console.log('error: ', error.response.data.message);
        }
      });
  };

  const kakaoWithdrawal = () => {
    Kakao.Auth.login({
      success: () => {
        Kakao.API.request({
          url: '/v1/user/unlink',
          success: () => {
            withdrawalRequest();
          },
          fail: (error) => {
            handleMessage('오류가 발생하였습니다.');
            console.log('error: ', error.response.data.message);
          }
        });
      }
    });
  };

  const cancelRequest = (id) => {
    let ids = id.split(',');
    ids = ids.map((el) => Number(el));
    setDeleteIds(ids);
    // console.log(ids);
    // dispatch(cancelDogwalker(ids));
    axios
      .delete(`${process.env.REACT_APP_API_URL}/request`, {
        data: { serviceId: ids },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          handleMessage('요청이 삭제되었습니다.');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleNotice(false);
          modal();
        } else {
          handleMessage('오류가 발생하였습니다.');
          console.log('error: ', error.response.data.message);
        }
      });
  };

  const handleDeleteReview = (id) => {
    let toBeReloaded = false;
    if (id.includes('#')) {
      id = id.slice(0, -1);
      toBeReloaded = true;
    }

    id = Number(id);

    axios
      .delete(`${process.env.REACT_APP_API_URL}/review`, {
        data: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          if (toBeReloaded) handleMessage('리뷰가 삭제되었습니다.!');
          else handleMessage('리뷰가 삭제되었습니다.');
          dispatch(deleteReview(id));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          modal();
        } else {
          handleMessage('오류가 발생하였습니다.');
          console.log('error: ', error.response.data.message);
        }
      });
  };

  return (
    <NoticeBackdrop>
      <NoticeView>
        <CloseIcon>
          {message.includes('요청이 삭제되었습니다')
            ? <FontAwesomeIcon
                icon={faTimes}
                color={Colors.gray}
                onClick={() => {
                  handleNotice(false);
                  dispatch(cancelDogwalker(deleteIds));
                }}
              />
            : message === '리뷰가 수정되었습니다.!' || message === '리뷰가 삭제되었습니다.!'
              ? <FontAwesomeIcon
                  icon={faTimes}
                  color={Colors.gray}
                  onClick={() => {
                    handleNotice(false);
                    window.location.reload();
                  }}
                />
              : <FontAwesomeIcon
                  icon={faTimes}
                  color={Colors.gray}
                  onClick={() => {
                    handleNotice(false);
                  }}
                />}
        </CloseIcon>
        <Message
          topMargin={
            message.includes('정말 탈퇴하시겠습니까?') ||
            message === '로그인 성공!' ||
            message === '로그아웃 성공!' ||
            message === '회원가입 성공!' ||
            message === '회원탈퇴가 완료되었습니다.'
              ? '.4rem'
              : '1rem'
          }
        >
          {message.includes('정말 요청을 취소하시겠습니까?') ||
          message.includes('만료된 요청을 삭제하시겠습니까?') ||
          message.includes('정말 탈퇴하시겠습니까?') ||
          message === '리뷰가 수정되었습니다.!' ||
          message.includes('리뷰를 삭제하시겠습니까?') ||
          message === '리뷰가 삭제되었습니다.!'
            ? message.split('!')[0]
            : message}
        </Message>
        {message === '로그인 성공!' ||
        message === '로그아웃 성공!' ||
        message === '회원가입 성공!' ||
        message === '회원탈퇴가 완료되었습니다.'
          ? <NoticeButton
              onClick={() => {
                window.location.replace('/');
              }}
            >
            메인화면으로
          </NoticeButton>
          : message === '비밀번호가 수정되었습니다.'
            ? <NoticeClose
                onClick={() => {
                  window.location.replace('/mypage');
                }}
              >
              확인
            </NoticeClose>
            : message === '정말 탈퇴하시겠습니까?!g'
              ? (
                <NoticeButton onClick={withdrawalRequest}>탈퇴하기</NoticeButton>
                )
              : message === '정말 탈퇴하시겠습니까?!k'
                ? (
                  <NoticeButton onClick={kakaoWithdrawal}>탈퇴하기</NoticeButton>
                  )
                : message.includes('정말 요청을 취소하시겠습니까?')
                  ? (
                    <NoticeButton onClick={() => cancelRequest(message.split('!')[1])}>취소하기</NoticeButton>
                    )
                  : message.includes('만료된 요청을 삭제하시겠습니까?')
                    ? (
                      <NoticeButton onClick={() => cancelRequest(message.split('!')[1])}>삭제하기</NoticeButton>
                      )
                    : message.includes('요청이 완료되었습니다.')
                      ? (
                        <NoticeButton onClick={() => {
                          window.location.replace('/myrequest');
                        }}
                        >내역 확인하기
                        </NoticeButton>
                        )
                      : message.includes('리뷰를 삭제하시겠습니까?')
                        ? (
                          <NoticeButton onClick={() => handleDeleteReview(message.split('!')[1])}>삭제하기</NoticeButton>
                          )
                        : null}
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notification;
