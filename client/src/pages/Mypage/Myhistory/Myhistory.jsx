import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { cancelRating, untrackRating, trackRating } from '../../../redux/action';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Colors } from '../../../components/utils/_var';
import TopNavigation from '../../../components/TopNavigation';
import Rating from './Rating';
import Review from './Review';
import ReviewEdit from './ReviewEdit';
axios.defaults.withCredentials = true;
require('dotenv').config();

export const MyHistoryWrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 13.45rem);
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
  .card:first-of-type {
    border-top: none;
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

function MyHistory ({ modal, handleMessage, handleNotice }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.user).token;

  const [openRating, setOpenRating] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openReviewEdit, setOpenReviewEdit] = useState(false);
  const [historyInfo, setHistoryInfo] = useState({ historyId: null, historyIndex: null });

  const [serviceDate, setServiceDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allHistory, setAllHistory] = useState([]);
  const [givenRating, setGivenRating] = useState([]);
  const [givenReview, setGivenReview] = useState([]);
  const [targetReview, setTargetReview] = useState({
    id: null,
    content: null
  });
  // console.log(allHistory)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setAllHistory(result.data.data.allHistories);
        setGivenRating(result.data.data.ratings);
        setGivenReview(result.data.data.reviews);
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 401) modal();
        else if (error.response.data.message === 'No histories are found') {
          setIsLoading(false);
        } else {
          console.log('error: ', error.response.data.message);
        }
      }
    };
    fetchData();
  }, []);

  // const givenRating = useSelector((state) => state.rating).givenRating;
  // const givenReview = useSelector((state) => state.review).givenReview;
  // const review = useSelector((state) => state.review).dogWalkers;

  const givenRatingIds = givenRating.map((el) => el.historyId) || [];
  const givenReviewIds = givenReview.map((el) => el.historyId);

  // console.log(givenReview);
  // console.log(givenRatingIds);
  // console.log(givenRating)
  const handleRatingOpen = (id, idx) => {
    // console.log(dogwalkerId);
    // setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: index });
    setHistoryInfo({ historyId: id, historyIndex: idx + 1 });

    setOpenRating(true);
  };

  const handleRatingClose = () => {
    setOpenRating(false);
  };

  const handleReviewOpen = (id, idx, date) => {
    setHistoryInfo({ historyId: id, historyIndex: idx + 1 });

    // setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: historyId });
    setServiceDate(date);
    setOpenReview(true);
  };
  // console.log(historyInfo);
  const handleReviewClose = () => {
    setOpenReview(false);
  };

  const handleReviewEditOpen = (dogwalkerId, historyId) => {
    // setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: historyId });

    // console.log(review[dogwalkerId - 1]);
    givenReview.forEach((el) => {
      if (el.historyId === historyId + 1) {
        setTargetReview({
          id: el.id,
          content: el.content
        });
        // console.log(el.content, el.id)
      }
    });
    setOpenReviewEdit(true);
  };

  // console.log(targetReview);
  const handleReviewEditClose = () => {
    setOpenReviewEdit(false);
  };

  const handleCancelRating = (el) => {
    console.log(el.historyId);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/rating`, {
        data: { historyId: el.historyId },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          handleMessage('평점이 삭제되었습니다.');
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          modal();
        } else console.log(error.response.data.message);
      });
    window.location.reload();

    // let index;
    // givenRating.forEach((el) => {
    //   if (el.historyId === idx) index = el.index;
    // });
    // dispatch(cancelRating(dogwalkerId, index));
    // dispatch(untrackRating(idx));
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
          {allHistory.length === 0
            ? <div>결과 없음</div>
            : allHistory.map((el, idx) => {
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
                  {givenRatingIds.includes(idx + 1)
                    ? (
                      <div
                        className='bnt rating'
                        // onClick={() => handleCancelRating(el.dogwalkerId, idx)}
                        onClick={() => handleCancelRating(el)}
                      >
                        평점 삭제
                      </div>
                      )
                    : (
                      <div className='bnt rating' onClick={() => handleRatingOpen(el.id, idx)}>
                        평점 등록
                      </div>
                      )}
                  {givenReviewIds.includes(idx + 1)
                    ? (
                      <div
                        className='bnt review'
                        onClick={() => handleReviewEditOpen(el.dogwalkerId, idx)}
                      >
                        리뷰 확인
                      </div>
                      )
                    : (
                      <div
                        className='bnt review'
                        onClick={() => handleReviewOpen(el.id, idx, el.date)}
                      >
                        리뷰 등록
                      </div>
                      )}
                </div>
              );
            })}
        </div>
        {openRating
          ? <Rating
              handleModal={handleRatingClose}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
              historyInfo={historyInfo}
              token={token}
              modal={modal}
            />
          : null}
        {openReview
          ? (
            <Review
              modal={modal}
              handleModal={handleReviewClose}
              // dogwalkerId={historyInfo.dogwalkerId}
              // historyId={historyInfo.historyId}
              historyInfo={historyInfo}
              serviceDate={serviceDate}
              token={token}
            />
            )
          : null}
        {openReviewEdit
          ? (
            <ReviewEdit
              modal={modal}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
              handleModal={handleReviewEditClose}
              targetReview={targetReview}
              token={token}
            />
            )
          : null}
      </div>
    </MyHistoryWrapper>
  );
}

export default MyHistory;
