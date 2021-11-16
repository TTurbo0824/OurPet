import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postReview, trackReview } from '../../../redux/action';
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
    margin: .7rem auto 0.8rem;
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

function Review ({ serviceDate, handleModal, dogwalkerId }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user).walkingDogUserInfo;
  const review = useSelector((state) => state.review).dogWalkers;
  const track = useSelector((state) => state.review).givenReview;
  const indexNum = review[dogwalkerId - 1].review.length;
  const { nickname } = userInfo;
  const [errorMsg, setErrorMsg] = useState('');
  const [walkerReview, setWalkerReview] = useState(null);

  const handleInput = (e) => {
    setWalkerReview(e.target.value);
  };

  console.log(indexNum);
  const reviewInfo = {
    dogwalkerId: dogwalkerId,
    historyId: track.length + 1,
    index: indexNum
  };

  const handleReview = () => {
    if (!walkerReview || walkerReview.length < 5) {
    // if (!walkerReview || walkerReview.length < 10) {
      setErrorMsg('리뷰를 10자 이상 작성해 주세요');
    } else if (walkerReview.length < 10) {
      dispatch(postReview(dogwalkerId, nickname, walkerReview, serviceDate));
      dispatch(trackReview(reviewInfo));
      handleModal();
    }
  };

  // console.log(dogwalkerId, nickname, walkerReview, serviceDate);

  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleModal} />
        <div className='description'>서비스는 어떠셨나요?</div>
        <ReviewInput onChange={handleInput} placeholder='최소 10자 이상 입력해주세요.' />
        <ReviewButton onClick={handleModal}>취소</ReviewButton>
        <ReviewButton onClick={handleReview}>등록</ReviewButton>
        <Alertbox>{errorMsg}</Alertbox>
      </ReviewView>
    </Backdrop>
  );
}

export default Review;
