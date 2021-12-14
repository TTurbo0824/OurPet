import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { trackRating } from '../../../redux/action';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import { Backdrop, Alertbox } from '../../../components/UserComponents';
import CloseButton from '../../../components/CloseButton';
import Select from 'react-select';
import { customStyles } from '../../../components/SelectBoxStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons';

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

const RatingButton = styled.button`
  margin: 1rem 0.6rem 0.8rem;
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

// ==================================================================
//                               TO DO
// ==================================================================
//  1. 별점 Select box 생성
//

function Rating ({ handleModal, handleMessage, handleNotice, historyInfo, token, modal }) {
  const dispatch = useDispatch();
  const { historyId } = historyInfo;
  const [walkerRate, setWalkerRate] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  // console.log(historyId);

  const options = [
    {
      value: 5,
      label: (
        <div className='icon-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
        </div>
      )
    },
    {
      value: 4,
      label: (
        <div className='icon-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          {/* <FontAwesomeIcon color={Colors.mediumLightGray} icon={faStar} size="1x" /> */}
        </div>
      )
    },
    {
      value: 3,
      label: (
        <div className='icon-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
        </div>
      )
    },
    {
      value: 2,
      label: (
        <div className='icon-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
        </div>
      )
    },
    {
      value: 1,
      label: (
        <div className='icon-container'>
          <FontAwesomeIcon icon={faStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
          <FontAwesomeIcon icon={fasStar} size='1x' />
        </div>
      )
    }
  ];

  const setRating = (e) => {
    setWalkerRate(e.value);
  };

  const ratingInfo = {
    id: historyId,
    rating: walkerRate
  };

  const handleRating = () => {
    if (walkerRate) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/rating`, ratingInfo, {
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
            handleMessage('평점이 등록되었습니다.');
            dispatch(trackRating(ratingInfo));
          }
        })
        .catch((error) => {
          if (error.response.status === 410) {
            modal();
          } else console.log(error.response.data.message);
        });
    } else {
      setErrorMsg('평점을 선택해 주세요');
    }
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
            placeholder='평점 선택'
            options={options}
            maxMenuHeight={125}
          />
        </div>
        <RatingButton onClick={handleModal}>취소</RatingButton>
        <RatingButton onClick={handleRating}>등록</RatingButton>
        <Alertbox>{errorMsg}</Alertbox>
      </RatingView>
    </Backdrop>
  );
}

export default Rating;
