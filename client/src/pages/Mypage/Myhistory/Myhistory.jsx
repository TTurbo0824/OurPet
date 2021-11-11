import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import TopNavigation from '../../../components/TopNavigation';
import Rating from './Rating';
import Review from './Review';

export const MyHistoryWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 10.9rem);
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

  console.log(historyList);
  const handleRatingOpen = () => {
    setOpenRating(true);
  };

  const handleRatingClose = () => {
    setOpenRating(false);
  };

  const handleReviewOpen = () => {
    setOpenReview(true);
  };

  const handleReviewClose = () => {
    setOpenReview(false);
  };
  
  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        My History
        <div onClick={handleRatingOpen}>평점 등록</div>
        <div onClick={handleReviewOpen}>리뷰 등록</div>
        {openRating ? <Rating handleModal={handleRatingClose} /> : null}
        {openReview ? <Review handleModal={handleReviewClose} /> : null}
      </div>
    </MyHistoryWrapper>
  );
}

export default MyHistory;
