import { useSelector, useDispatch } from 'react-redux';
import { cancelRating } from '../../../redux/action';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../components/utils/_var';
import TopNavigation from '../../../components/TopNavigation';
import Rating from './Rating';
import Review from './Review';

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
    grid-template-columns: 23% 47% 15% 15%;
    margin: 0 auto;
    /* text-align: center; */
    border-top: 1px solid ${Colors.lightGray};
    padding: .4rem 1rem;
    width: 40rem;
  }
  .dogwalker-img {
    grid-area: img;
    width: 7.5rem;
    height: 7.5rem;
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
  .rating {
    grid-area: rating;
    background-color: honeydew;
  }
  .review {
    grid-area: review;
    background-color: mediumturquoise;
  }
  .bnt {
    cursor: pointer;
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
  const historyList = useSelector((state) => state.history).dogWalkerHistory;
  const [openRating, setOpenRating] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [walkerId, setWalkerId] = useState(0);

  // console.log(historyList);

  const handleRatingOpen = (id) => {
    setWalkerId(id);
    setOpenRating(true);
  };

  const handleRatingClose = () => {
    setOpenRating(false);
  };

  const handleReviewOpen = (id) => {
    setWalkerId(id);
    setOpenReview(true);
  };

  const handleReviewClose = () => {
    setOpenReview(false);
  };

  const handleCancel = () => {
    dispatch(cancelRating(1, 5));
  };

  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          {historyList.map((el, idx) => {
            return (
              <div className='card' key={idx}>
                <img className='dogwalker-img' src={el.img} alt={el.name} />
                <div className='name'>{el.name}</div>
                <div className='info'>{el.date} <span>|</span> {el.duration}분 / {el.price}원</div>
                <div className='type'>{el.type}</div>
                <div className='bnt rating' onClick={() => handleRatingOpen(el.dogwalkerId)}>평점 등록</div>
                <div className='bnt review' onClick={() => handleReviewOpen(el.dogwalkerId)}>리뷰 등록</div>
              </div>
            );
          })}
        </div>
        {openRating ? <Rating handleModal={handleRatingClose} dogwalkerId={walkerId} /> : null}
        {openReview ? <Review handleModal={handleReviewClose} dogwalkerId={walkerId} /> : null}
      </div>
    </MyHistoryWrapper>
  );
}

export default MyHistory;
