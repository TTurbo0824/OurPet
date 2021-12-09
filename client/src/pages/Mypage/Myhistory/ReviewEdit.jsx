import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Alertbox, Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
axios.defaults.withCredentials = true;

export const ReviewView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
  .description {
    margin: 0.7rem auto 0.8rem;
  }
`;

const ReviewInput = styled.textarea`
  resize: none;
  outline: none;
  width: 80%;
  height: 8rem;
  padding: 0.5rem;
  border-color: ${Colors.lightGray};
  font-family: 'Noto Sans KR', sans-serif;
`;

const ReviewButton = styled.button`
  margin: 1rem 0.6rem 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${Colors.lightYellow};
  width: 7rem;
  height: 2.5rem;
  border-radius: 7px;
  border: none;
  color: white;
  :hover {
    background-color: ${Colors.yellow};
  }
`;

function ReviewEdit ({ modal, token, handleNotice, handleMessage, handleModal, targetReview }) {
  const { id, content } = targetReview;
  const [walkerReview, setWalkerReview] = useState(content);
  const [errorMsg, setErrorMsg] = useState('');
  console.log(targetReview);
  const handleInput = (e) => {
    setWalkerReview(e.target.value);
  };

  const handleEditReview = () => {
    if (!walkerReview || walkerReview.length < 5) {
      // if (!walkerReview || walkerReview.length < 10) {
      setErrorMsg('리뷰를 10자 이상 작성해 주세요');
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/review`, { id: id, content: walkerReview }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            handleModal();
            handleNotice(true);
            handleMessage('리뷰가 수정되었습니다.');
            // dispatch(cancelDogwalker(Number(id)));
          }
        })
        .catch((error) => {
          if (error.response.status === 410) {
            modal();
          } else console.log(error.response.data.message);
        });
      window.location.reload();
    }
  };

  const handleDeleteReview = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + '/review', {
        data: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          handleMessage('리뷰가 삭제되었습니다.');
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          modal();
        } else console.log(error.response.data.message);
      });
    handleModal();
  };

  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleModal} />
        <div className='description'>서비스는 어떠셨나요?</div>
        <ReviewInput onChange={handleInput} value={walkerReview} />
        <ReviewButton onClick={handleEditReview}>수정</ReviewButton>
        <ReviewButton onClick={() => handleDeleteReview()}>삭제</ReviewButton>
        <Alertbox>{errorMsg}</Alertbox>
      </ReviewView>
    </Backdrop>
  );
}

export default ReviewEdit;
