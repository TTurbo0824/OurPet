import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../../redux/action';
import axios from 'axios';
// import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Alertbox, Backdrop } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
import { ReviewView, ReviewInput, HistoryButton } from '../../../components/MyPageComponents';
axios.defaults.withCredentials = true;

function ReviewEdit ({ modal, token, handleNotice, handleMessage, handleModal, targetReview }) {
  const dispatch = useDispatch();
  const { id, content } = targetReview;
  const [walkerReview, setWalkerReview] = useState(content);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setWalkerReview(e.target.value);
  };

  const handleEditReview = () => {
    if (!walkerReview || walkerReview.length < 5) {
      // if (!walkerReview || walkerReview.length < 10) {
      setErrorMsg('리뷰를 10자 이상 작성해주세요');
    } else if (walkerReview === content) {
      setErrorMsg('수정 사항을 입력해주세요.');
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/review`, { id: id, content: walkerReview }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            handleModal();
            handleNotice(true);
            handleMessage('리뷰가 수정되었습니다.');
            dispatch(editReview(id, walkerReview));
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            handleModal();
            modal();
          } else {
            handleModal();
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
            console.log('error: ', error.response.data.message);
          }
        });
    }
  };

  const handleDeleteReview = () => {
    handleNotice(true);
    handleMessage(`리뷰를 삭제하시겠습니까?!${id}`);
    handleModal();
  };

  return (
    <Backdrop>
      <ReviewView>
        <CloseButton onClick={handleModal} />
        <div className='description'>서비스는 어떠셨나요?</div>
        <ReviewInput onChange={handleInput} value={walkerReview} />
        <HistoryButton bntColor={Colors.lightYellow} onClick={handleEditReview}>수정</HistoryButton>
        <HistoryButton bntColor={Colors.gray} onClick={handleDeleteReview}>삭제</HistoryButton>
        <Alertbox>{errorMsg}</Alertbox>
      </ReviewView>
    </Backdrop>
  );
}

export default ReviewEdit;
