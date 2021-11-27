import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { cancelRating, untrackRating } from '../../../redux/action';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import TopNavigation from '../../../components/TopNavigation';
import Rating from './Rating';
import Review from './Review';
import ReviewEdit from './ReviewEdit';

export const MyHistoryWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 10.9rem);
  }
  .container {
    margin: 1rem auto;
  }
  .card {
    display: grid;
    grid-template-areas:
      'img title rating review'
      'img info rating review'
      'img type rating review';
    grid-template-columns: 7.25rem 50% 15% 15%;
    margin: 0 auto;
    /* text-align: center; */
    border-top: 1px solid ${Colors.lightGray};
    padding: 0.4rem 1rem;
    width: 40rem;
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 6rem;
    height: 6rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .name {
    grid-area: title;
  }
  .info {
    grid-area: info;
  }
  .type {
    grid-area: type;
  }
  .name, .info, .type {
    font-size: .9rem;
  }
  .rating {
    grid-area: rating;
  }
  .review {
    grid-area: review;
  }
  .bnt {
    cursor: pointer;
    align-self: center;
    justify-self: center;
    padding: .4rem .7rem;
    font-size: .85rem;
    border: 1px solid ${Colors.mediumLightGray};
  }
`;

// ==================================================================
//                               TO DO
// ==================================================================
//  1. 기본 틀 잡기
//  2. 평점 등록 모달 생성
//  3. 리뷰 등록 모달 생성
//

function MyHistory () {
  const dispatch = useDispatch();
  const history = useHistory();
  const historyList = useSelector((state) => state.history).dogWalkerHistory;
  const givenRating = useSelector((state) => state.rating).givenRating;
  const givenReview = useSelector((state) => state.review).givenReview;
  const [openRating, setOpenRating] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openReviewEdit, setOpenReviewEdit] = useState(false);
  const [historyInfo, setHistoryInfo] = useState({ dogwalkerId: null, historyId: null });
  const [serviceDate, setServiceDate] = useState(null);
  const review = useSelector((state) => state.review).dogWalkers;

  const givenRatingIds = givenRating.map((el) => el.historyId) || [];
  const givenReviewIds = givenReview.map((el) => el.historyId);

  // console.log(givenRatingIds);
  const handleRatingOpen = (dogwalkerId, index) => {
    console.log(dogwalkerId);
    setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: index });
    setOpenRating(true);
  };

  const handleRatingClose = () => {
    setOpenRating(false);
  };

  const handleReviewOpen = (dogwalkerId, historyId, date) => {
    setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: historyId });
    setServiceDate(date);
    setOpenReview(true);
  };

  const handleReviewClose = () => {
    setOpenReview(false);
  };

  const handleReviewEditOpen = (dogwalkerId, historyId) => {
    setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: historyId });
    setOpenReviewEdit(true);
    console.log(review[dogwalkerId - 1]);
  };

  const handleReviewEditClose = () => {
    setOpenReviewEdit(false);
  };

  const handleCancelRating = (dogwalkerId, idx) => {
    let index;
    givenRating.forEach((el) => {
      if (el.historyId === idx) index = el.index;
    });
    dispatch(cancelRating(dogwalkerId, index));
    dispatch(untrackRating(idx));
  };

  const handleClick = (id) => {
    history.push({ pathname: `/dogwalker:id=${id}` });
  };

  const addComma = (num) => {
    num = String(num).split('');
    num.splice(-3, 0, ',');
    num = num.join('');
    return num;
  };

  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          {historyList.map((el, idx) => {
            return (
              <div className='card' key={idx}>
                <img
                  className='dogwalker-img'
                  src={el.img}
                  alt={el.name}
                  onClick={() => handleClick(el.dogwalkerId)}
                />
                <div className='name'>{el.name}</div>
                <div className='info'>
                  {el.date} <span>|</span> {el.duration}분 / {addComma(el.price)}원
                </div>
                <div className='type'>{el.type}</div>
                {givenRatingIds.includes(idx)
                  ? (
                    <div
                      className='bnt rating'
                      onClick={() => handleCancelRating(el.dogwalkerId, idx)}
                    >
                      평점 삭제
                    </div>
                    )
                  : (
                    <div className='bnt rating' onClick={() => handleRatingOpen(el.dogwalkerId, idx)}>
                      평점 등록
                    </div>
                    )}
                {givenReviewIds.includes(idx)
                  ? (
                    <div
                      className='bnt review'
                      onClick={() => handleReviewEditOpen(el.dogwalkerId, idx)}
                      // onClick={() => handleDeleteReview(el.dogwalkerId, idx)}
                    >
                      리뷰 확인
                    </div>
                    )
                  : (
                    <div
                      className='bnt review'
                      onClick={() => handleReviewOpen(el.dogwalkerId, idx, el.date)}
                    >
                      리뷰 등록
                    </div>
                    )}
              </div>
            );
          })}
        </div>
        {openRating ? <Rating handleModal={handleRatingClose} historyInfo={historyInfo} /> : null}
        {openReview
          ? (
            <Review
              handleModal={handleReviewClose}
              dogwalkerId={historyInfo.dogwalkerId}
              historyId={historyInfo.historyId}
              serviceDate={serviceDate}
            />
            )
          : null}
        {openReviewEdit
          ? (
            <ReviewEdit
              handleModal={handleReviewEditClose}
              dogwalkerId={historyInfo.dogwalkerId}
              historyId={historyInfo.historyId}
            />
            )
          : null}
      </div>
    </MyHistoryWrapper>
  );
}

export default MyHistory;
