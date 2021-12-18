import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../../redux/action';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Alertbox, Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
import { ReviewView, ReviewInput, HistoryButton } from '../../../components/MyPageComponents';
import axios from 'axios';

function Review ({ modal, token, historyInfo, handleModal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [walkerReview, setWalkerReview] = useState(null);
  const { historyId } = historyInfo;
  const handleInput = (e) => {
    setWalkerReview(e.target.value);
  };

  const reviewInfo = {
    id: historyId,
    content: walkerReview
  };

  const handleReview = () => {
    if (!walkerReview || walkerReview.length < 5) {
    // if (!walkerReview || walkerReview.length < 10) {
      setErrorMsg('리뷰를 10자 이상 작성해 주세요');
    } else {
      // dispatch(postReview(reviewInfo));
      axios
        .post(`${process.env.REACT_APP_API_URL}/review`, reviewInfo, {
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
            handleMessage('리뷰가 등록되었습니다.');
            dispatch(postReview(reviewInfo));
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            handleModal();
            modal();
          } else console.log(error.response.data.message);
        });
    }
  };

  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleModal} />
        <div className='description'>서비스는 어떠셨나요?</div>
        <ReviewInput onChange={handleInput} placeholder='최소 10자 이상 입력해주세요.' />
        <HistoryButton bntColor={Colors.gray} onClick={handleModal}>취소</HistoryButton>
        <HistoryButton bntColor={Colors.lightYellow} onClick={handleReview}>등록</HistoryButton>
        <Alertbox>{errorMsg}</Alertbox>
      </ReviewView>
    </Backdrop>
  );
}

export default Review;
