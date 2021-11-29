import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestDogwalker } from '../../redux/action';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
import Charge from './Charge';
import DateSelector from './DateSelector';
import DurationSelector from './DurationSelector';
import TimeSelector from './TimeSelector';
import TypeSelector from './TypeSelector';
import LocationSelector from './LocationSelector';
import ReviewContainer from './ReviewContainer';
import profile from '../../images/profile_sample.jpeg';
const DogWalkerPageWrapper = styled.div`
  .main {
    min-height: calc(100vh - 10.9rem);
    max-width: 62rem;
    margin: 0 auto;
  }
  .top-container {
    display: grid;
    grid-template-areas:
      'img nickname'
      'img location';
    grid-template-columns: 10rem 1fr;
    grid-template-rows: 2rem 1fr;
    padding-top: 2rem;
    margin-bottom: 1rem;
  }
  .image-container {
    grid-area: img;
  }
  .dogwalker-img {
    width: 10rem;
  }
  .name, .location {
    padding-left: 1rem;
  }
  .name {
    grid-area: nickname;
  }
  .location {
    grid-area: location;
  }
  .location-name:not(:last-child)::after {
    content: '·';
    margin-left: .25rem;
  }
  .review-rating {
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
    padding-right: 3rem;
  }
  .right-container {
    grid-area: right-c;
  }
  .request-container {
    border: 1px solid ${Colors.lightGray};
    border-radius: 6px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1.3rem;
    box-shadow: 2px 2px 3px ${Colors.lightGray};
  }
  .time-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .tag-container {
    margin-bottom: 1rem;
  }
  .title {
    margin: 1rem 0 1rem;
    font-weight: bold;
  }
  .pro-description {
    /* color: ${Colors.darkYellow}; */
  }
  .charge-container {
    margin-top: 2rem;
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

const RequestButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
  margin: 2rem auto .5rem;
  background-color: ${Colors.yellow};
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  border: 0;
  border-radius: 4px;
  &:hover {
    background-color: ${Colors.darkYellow};
  }
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

  dogWalker = dogWalker[0];

  // console.log(requestOptions);

  const dogType = dogWalker.tags.filter((type) => {
    if (type.length === 3) {
      return type;
    } else return null;
  });

  const charges = dogWalker.charges;
  const chargeList = [];
  // console.log(dogWalker.charges);
  Object.keys(charges).map((charge) => {
    chargeList.push(charge);
    chargeList.push(...charges[charge]);
  });

  const handleRequest = () => {
    // JUST FOR TESTING PURPOSES
    // dispatch(requestDogwalker(requestOptions));
    console.log(requestOptions);
    if (requestOptions.type === '' || requestOptions.location === '' || requestOptions.date === '' || requestOptions.duration === 0) {
      handleNotice(true);
      handleMessage('모든 항목을 입력해주세요.');
    }
    if (!token) {
      // handleNotice(true);
      // handleMessage('로그인이 필요한 서비스입니다.');
    } else {
      console.log('clicked');
      axios.post(
        process.env.REACT_APP_API_URL + '/request', requestOptions, {
          headers: {
            Authorization: `Bearer ${token}`,
            // JUST FOR TESTING PURPOSES
            // Authorization: '1',
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(requestDogwalker(requestOptions));
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
  };

  return (
    <DogWalkerPageWrapper>
      <div className='main'>
        <div className='top-container'>
          <div className='image-container'>
            <img className='dogwalker-img' src={profile} alt='profile_image' />
          </div>
          <div className='name'>{dogWalker.name} · <span className='pro-description'>프로 도그워커</span></div>
          <div className='location'>{dogWalker.locations.map((el, idx) => <span key={idx} className='location-name'>서울 {el}</span>)}</div>
        </div>
        <div className='bottom-container'>
          <div className='left-container'>
            <div className='tag-container'>
              <div className='title'>이용 가능 서비스</div>
              {dogWalker.tags.map((tag, idx) =>
                <Tag key={idx}>{tag}</Tag>
              )}
            </div>
            <div className='review-container'>
              <ReviewContainer averageRating={averageRating} rating={rating} reviews={reviews} />
            </div>
          </div>
          <div className='right-container'>
            <div className='request-container'>
              <DateSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} />
              <div className='time-container'>
                <TimeSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} />
                <DurationSelector
                  requestOptions={requestOptions}
                  setRequestOptions={setRequestOptions}
                  chargeList={chargeList}
                />
              </div>
              <LocationSelector requestOptions={requestOptions} setRequestOptions={setRequestOptions} locations={dogWalker.locations} />
              <TypeSelector
                requestOptions={requestOptions}
                setRequestOptions={setRequestOptions}
                dogType={dogType}
                chargeList={chargeList}
              />
              <RequestButton onClick={handleRequest}>예약 요청</RequestButton>
            </div>
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
