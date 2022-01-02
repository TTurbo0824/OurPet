import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestDogwalker } from '../../redux/action';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';
import Charge from './Charge';
import DateSelector from './DateSelector';
import DurationSelector from './DurationSelector';
import TimeSelector from './TimeSelector';
import TypeSelector from './TypeSelector';
import LocationSelector from './LocationSelector';
import ReviewContainer from './ReviewContainer';
import profile from '../../images/profile_sample.jpeg';
import { PageLoading } from '../../components/PageLoading';

// ==================================================================
//                               TO DO
// ==================================================================
//  1. 도그워커 소개 4-5개 작성
//

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
    grid-template-columns: 8.1rem 1fr;
    ${media.tablet` grid-template-columns: 10rem 1fr;`}
    grid-template-rows: 2rem 1fr;
    margin-bottom: .5rem;
    padding: 1.75rem .8rem 0;
    ${media.tablet`padding: 1.75rem 0 0;`}
  }
  .image-container {
    grid-area: img;
  }
  .dogwalker-img {
    width: 8rem;
    ${media.tablet`width: 10rem;`}
  }
  .name, .location {
    padding-left: 1rem;
    font-size: .95rem;
    ${media.tabletMini`font-size: 1rem;`}
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
    grid-template-areas: 'intro-c' 'tag-c' 'right-c' 'review-c';
    grid-template-columns: 1fr;
    ${media.tablet`grid-template-areas: 'intro-c right-c' 'tag-c right-c'  'review-c right-c';`}
    ${media.tablet`grid-template-columns: 60% 40%;`}
    justify-content: stretch;
  }
  .intro-container {
    grid-area: intro-c;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    ${media.tablet`margin-bottom: 2rem; padding: 0;`}
  }
  .tag-container {
    grid-area: tag-c;
    margin-bottom: 3rem;
    padding: 0 1rem;
    ${media.tablet`padding: 0; margin-bottom: 2rem;`}
  }
  .review-container {
    grid-area: review-c;
    padding: 0 1rem;
    ${media.tablet`padding-right: 3rem; padding-left: 0;`}
  }
  .right-container {
    grid-area: right-c;
    padding: 0 .8rem;
    ${media.tablet`padding: 0;`}
  }
  .request-container {
    border: 1px solid ${Colors.lightGray};
    border-radius: 6px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    margin-top: .25rem;
    box-shadow: 2px 2px 3px ${Colors.lightGray};
    font-size: .92rem;
    ${media.tabletMini`font-size: 1rem;`}
  }
  .time-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .title {
    margin: 1rem 0 1rem;
    font-weight: bold;
    color: ${Colors.black};
  }
  .charge-container {
    margin-top: 2rem;
  }
`;

const Tag = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  font-size: .9rem;
  margin: .2rem .5rem .2rem 0;
  padding: .05rem 1rem .2rem;
  color: ${Colors.darkGray};
  border: solid 1px ${Colors.gray};
`;

const RequestButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 2.5rem;
  margin: 2rem auto .5rem;
  background-color: ${Colors.yellow};
  color: white;
  font-size: .9rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  :hover {
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
  const reviews = useSelector((state) => state.review).dogWalkers[dogWalkerId - 1].review;
  const [isLoading, setIsLoading] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/dogwalker?id=${dogWalkerId}`);
        setRatingData(result.data.data[0].ratings);
        setReviewData(result.data.data[0].reviews);
        setIsLoading(false);
      } catch (error) {
        if (error.response.data.message === 'No requests are found') {
          setIsLoading(false);
        } else {
          handleNotice(true);
          handleMessage('오류가 발생하였습니다.');
          console.log('error: ', error.response.data.message);
        }
      }
    };
    fetchData();
  }, [dogWalkerId]);

  const allRating = [...rating];
  allRating.push(...ratingData);
  const averageRating = (allRating.reduce((acc, cur) => acc + cur) / allRating.length).toFixed(1);

  const allReview = [...reviews];
  allReview.push(...reviewData);

  const default_date = new Date();

  const formatDate = (date) => {
    const formatted_date = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    return formatted_date;
  };

  const requestInitial = {
    id: 0,
    dogwalkerId: dogWalkerId,
    name: dogWalker[0].name,
    img: dogWalker[0].img,
    type: '',
    location: '',
    date: formatDate(default_date),
    duration: 0,
    price: 0
  };

  const [requestOptions, setRequestOptions] = useState(requestInitial);

  dogWalker = dogWalker[0];

  const dogType = dogWalker.tags.filter((type) => {
    if (type.length === 3) {
      return type;
    } else return null;
  });

  const charges = dogWalker.charges;
  const chargeList = [];

  Object.keys(charges).forEach((charge) => {
    chargeList.push(charge);
    chargeList.push(...charges[charge]);
  });

  const handleRequest = () => {
    if (!token) {
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다.');
    } else if (requestOptions.type === '' || requestOptions.location === '' || requestOptions.date === '' || requestOptions.duration === 0) {
      handleNotice(true);
      handleMessage('모든 항목을 입력해주세요.');
    } else {
      axios.post(
        process.env.REACT_APP_API_URL + '/request', requestOptions, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          if (res.status === 200) {
            setRequestOptions({ ...requestOptions, id: res.data.data.id });
          }
        })
        .then(() => {
          dispatch(requestDogwalker(requestOptions));
          handleNotice(true);
          handleMessage('요청이 완료되었습니다.');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            modal();
          } else if (error.response.status === 403) {
            handleNotice(true);
            handleMessage('예약 가능 시간이 지났습니다.');
          } else if (error.response.status === 409) {
            handleNotice(true);
            handleMessage('중복된 요청은 하실 수 없습니다.');
          } else {
            console.log('error: ', error.response.data.message);
            handleNotice(true);
            handleMessage('오류가 발생하였습니다.');
          }
        });
    }
  };

  return (
    <DogWalkerPageWrapper>
      <div className='main'>
        {isLoading
          ? <PageLoading />
          : <>
            <div className='top-container'>
              <div className='image-container'>
                <img className='dogwalker-img' src={profile} alt='profile_image' />
              </div>
              <div className='name'>{dogWalker.name} · <span>프로 도그워커</span></div>
              <div className='location'>{dogWalker.locations.map((el, idx) => <span key={idx} className='location-name'>서울 {el}</span>)}</div>
            </div>
            <div className='bottom-container'>
              <div className='intro-container'>
                <div className='title'>도그워커 소개</div>
                도그워커 소개
              </div>
              <div className='tag-container'>
                <div className='title'>이용 가능 서비스</div>
                {dogWalker.tags.map((tag, idx) =>
                  <Tag key={idx}>{tag}</Tag>
                )}
              </div>
              <div className='review-container'>
                <ReviewContainer
                  token={token}
                  modal={handleNotice}
                  handleNotice={handleNotice}
                  handleMessage={handleMessage}
                  averageRating={averageRating}
                  rating={allRating}
                  reviews={allReview}
                />
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
            </>}
      </div>
    </DogWalkerPageWrapper>
  );
};

export default DogWalkerPage;
