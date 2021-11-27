import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editReview, deleteReview, untrackReview } from '../../../redux/action';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Alertbox, Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';

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

function ReviewEdit ({ handleModal, dogwalkerId, historyId }) {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review).dogWalkers;
  const givenReview = useSelector((state) => state.review).givenReview;

  const [errorMsg, setErrorMsg] = useState('');

  let currentReview;
  let reviewContent;

  givenReview.forEach((el) => {
    if (el.historyId === historyId) currentReview = el;
  });

  review[dogwalkerId - 1].review.forEach((review, idx) => {
    if (idx === currentReview.index) {
      reviewContent = review.content;
    }
  }
  );

  const [walkerReview, setWalkerReview] = useState(reviewContent);

  const handleInput = (e) => {
    setWalkerReview(e.target.value);
  };

  const handleEditReview = () => {
    if (!walkerReview || walkerReview.length < 5) {
      // if (!walkerReview || walkerReview.length < 10) {
      setErrorMsg('리뷰를 10자 이상 작성해 주세요');
    } else {
      dispatch(editReview(dogwalkerId, currentReview.index, walkerReview));
      handleModal();
    }
  };

  const handleDeleteReview = () => {
    let index;
    givenReview.forEach((el) => {
      if (el.historyId === historyId) index = el.index;
    });
    dispatch(deleteReview(dogwalkerId, index));
    dispatch(untrackReview(historyId));
    handleModal();
  };

  // console.log(dogwalkerId, nickname, walkerReview, serviceDate);

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
