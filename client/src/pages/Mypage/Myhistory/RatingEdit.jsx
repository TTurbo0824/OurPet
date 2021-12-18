import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editRating, removeRating } from '../../../redux/action';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Backdrop, Alertbox } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
import Select from 'react-select';
import { customStyles } from '../../../components/SelectBoxStyle';
import { options, HistoryButton } from '../../../components/MyPageComponents';

export const RatingView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 19rem;
  background-color: white;
  position: relative;
  text-align: center;
  padding-top: 0.7rem;
  box-shadow: 10px 10px grey;
  .description {
    margin: 2.25rem auto 0.8rem;
  }
  .rating-container {
    width: 80%;
    margin: 0 auto;
  }
  .icon-container {
    color: ${Colors.lightYellow};
  }
`;

function RatingEdit ({ handleModal, handleMessage, handleNotice, token, modal, targetRating }) {
  const dispatch = useDispatch();
  const { id, rating } = targetRating;
  const [walkerRate, setWalkerRate] = useState(rating);
  const [errorMsg, setErrorMsg] = useState('');

  const setRating = (e) => {
    setWalkerRate(e.value);
  };

  const handleEditRating = () => {
    if (rating === walkerRate) {
      setErrorMsg('평점을 수정해주세요');
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/rating`, { id: id, rating: walkerRate }, {
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
            handleMessage('평점이 수정되었습니다.');
            dispatch(editRating(id, walkerRate));
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            handleModal();
            modal();
          } else console.log('error: ', error.response.data.message);
        });
    }
  };

  const handleCancelRating = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/rating`, {
        data: { historyId: id },
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
          handleMessage('평점이 삭제되었습니다.');
          dispatch(removeRating(id));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleModal();
          modal();
        } else console.log('error: ', error.response.data.message);
      });
  };

  return (
    <Backdrop>
      <RatingView>
        <CloseButton onClick={handleModal} />
        <div className='description'>서비스에 만족하셨나요?</div>
        <div className='rating-container'>
          <Select
            onChange={setRating}
            styles={customStyles}
            isSearchable={false}
            placeholder={options[5 - rating].label || '평점 선택'}
            options={options}
            maxMenuHeight={125}
          />
        </div>
        <HistoryButton bntColor={Colors.lightYellow} onClick={handleEditRating}>수정</HistoryButton>
        <HistoryButton bntColor={Colors.gray} onClick={handleCancelRating}>삭제</HistoryButton>
        <Alertbox>{errorMsg}</Alertbox>
      </RatingView>
    </Backdrop>
  );
}

export default RatingEdit;
