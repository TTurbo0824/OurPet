import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestDogwalker } from '../../redux/action';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../components/utils/_var';
import Charge from './Charge';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';
import TypeSelector from './TypeSelector';
import LocationSelector from './LocationSelector';

const DogWalkerPageWrapper = styled.div`
  .main {
    height: 800rem;
    min-height: calc(100vh - 10.9rem);
  }
  .top-container {
    display: grid;
    grid-template-areas:
      'img nickname'
      'img location';
    grid-template-columns: 30% 70%;
    justify-content: stretch;
  }
  .image-container {
    grid-area: img;
    border: 1px solid black;
  }
  .dogwalker-img {
    width: 100%;
    height: auto;
    border: 0.5px solid rgb(238, 238, 238);
  }
  .name {
    grid-area: nickname;
    border: 1px solid black;
  }
  .location {
    grid-area: location;
    border: 1px solid black;
  }
  .rating {
    display: flex;
    align-items: center;
  }
  .bottom-container {
    display: grid;
    grid-template-areas: 'left-c right-c';
    grid-template-columns: 60% 40%;
    justify-content: stretch;
  }
  .left-container {
    grid-area: left-c;
    border: 1px solid black;
  }
  .right-container {
    grid-area: right-c;
    border: 1px solid black;
  }
  .tag-container {
    border: 1px solid black;
    background-color: ${Colors.mediumGray};
  }
`;

const Tag = styled.div`
  display: inline-block;
  margin: 0.2rem 0.4rem 0.2rem 0;
  padding: 0.05rem 1rem 0.2rem;
  border: solid 1px;
  border-radius: 20px;
  font-size: 0.9rem;
  background-color: white;
`;

const DogWalkerPage = ({ modal, handleMessage, handleNotice }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user).token;
  const dogWalkerList = useSelector((state) => state.dogwalker).dogWalkers;
  const dogWalkerId = Number(location.pathname.split('id=')[1]);
  let dogWalker = dogWalkerList.filter((dogwalker) => dogwalker.id === dogWalkerId);
  const rating = useSelector((state) => state.rating).dogWalkers[dogWalkerId - 1].rating;
  const averageRating = (rating.reduce((acc, cur) => acc + cur) / rating.length).toFixed(1);
  const reviews = useSelector((state) => state.review).dogWalkers[dogWalkerId - 1].review;
  const allRequest = useSelector((state) => state.request).dogWalkerRequest.length;

  // console.log('🥺🥺🥺🥺🥺🥺🥺🥺🥺');

  const requestInitial = {
    id: allRequest + 1,
    dogwalkerId: dogWalkerId,
    type: '',
    location: '',
    date: '',
    duration: 0,
    price: 0
  };

  const [requestOptions, setRequestOptions] = useState(requestInitial);

  const requestList = {
    id: reviews.length + 1,
    dogwalkerId: dogWalkerId,
    type: '소형견',
    location: '서대문구',
    date: '2021.11.10',
    duration: 30,
    price: 15000
  };

  dogWalker = dogWalker[0];

  console.log(requestOptions);

  const charges = dogWalker.charges;
  const chargeList = [];
  // console.log(dogWalker.charges);
  Object.keys(charges).map((charge) => {
    chargeList.push(charge);
    chargeList.push(...charges[charge]);
  });

  const handleRequest = () => {
    dispatch(requestDogwalker(requestOptions));

    /*
    if (!token) {
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다.');
    } else {
      console.log('clicked');
      axios.post(
        process.env.REACT_APP_API_URL + '/request',
        {
          dogwalkerId: dogWalkerId,
          type: '소형견',
          location: '서대문구',
          date: '2021.11.10',
          duration: 30,
          price: 15000
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(requestDogwalker(requestList));
          }
        })
        .catch((err) => {
          if (err.response.data.message === 'You\'re not logged in') {
            modal();
          } else if (err.response.status === 409) {
            handleNotice(true);
            handleMessage('중복된 요청은 하실 수 없습니다.');
          } else console.log(err.response);
        });
    }
    */
  };

  return (
    <DogWalkerPageWrapper>
      <div className='main'>
        <div className='top-container'>
          <div className='image-container'>
            <img className='dogwalker-img' src={dogWalker.img} alt={dogWalker.name} />
          </div>
          <div className='name'>{dogWalker.name}</div>
          <div className='location'>{dogWalker.locations}</div>
        </div>
        <div className='bottom-container'>
          <div className='left-container'>
            <div className='tag-container'>
              <div className='title'>이용 가능 서비스</div>
              {dogWalker.tags.map((tag, idx) => {
                return <Tag key={idx}>{tag}</Tag>;
              })}
            </div>
            <div className='review-container'>
              <div className='title'>도그워커 리뷰</div>
              <div className='rating'>
                <FontAwesomeIcon icon={faStar} size='1x' />
                <div>
                  {averageRating} ({rating.length})
                </div>
              </div>
              <div>
                {reviews.map((review, idx) => (
                  <div key={idx}>
                    <div>{review.nickname}</div>
                    <div>{review.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='right-container'>
            <DateSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} />
            <TimeSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} />
            <LocationSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} locations={dogWalker.locations} />

            {/* <div className='location-container'>
              <div>어디에서 산책을 원하시나요?</div>
              <select onChange={(e) => setLocation(e)}>
                <option value='장소'>장소</option>
                {dogWalker.locations.map((location, idx) => (
                  <option key={idx}>{location}</option>
                ))}
              </select>
            </div> */}
            <TypeSelector
              requestOptions={requestOptions}
              setRequestOptions={setRequestOptions}
              dogType={dogWalker.tags}
            />
            <button onClick={handleRequest}>예약 요청</button>
            <div className='charge-container'>
              <Charge chargeList={chargeList} />
            </div>
          </div>
        </div>
      </div>
    </DogWalkerPageWrapper>
  );
};

export default DogWalkerPage;
