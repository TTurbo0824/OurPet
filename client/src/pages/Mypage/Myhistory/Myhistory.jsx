import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteHistory, untrackRating } from '../../../redux/action';
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
  // const [isLoading, setIsLoading] = useState(false);
  // const [allHistory, setAllHistory] = useState([]);
  // const [givenRating, setGivenRating] = useState([]);
  // const [givenReview, setGivenReview] = useState([]);
  const [targetReview, setTargetReview] = useState({
    id: null,
    content: null
  });
  const [IdList, setIdList] = useState([]);
  const [CheckList, setCheckList] = useState([]);

  const allHistories = useSelector((state) => state.history).dogWalkerHistory;
  console.log(allHistories);
  // console.log(allHistory);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const result = await axios.get(`${process.env.REACT_APP_API_URL}/history`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       setAllHistory(result.data.data.allHistories);
  //       setGivenRating(result.data.data.ratings);
  //       setGivenReview(result.data.data.reviews);
  //       setIsLoading(false);
  //     } catch (error) {
  //       if (error.response.status === 401) modal();
  //       else if (error.response.data.message === 'No histories are found') {
  //         setIsLoading(false);
  //       } else {
  //         console.log('error: ', error.response.data.message);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const ids = [];
    if (allHistories.length !== 0) {
      allHistories.map((history, i) => {
        ids[i] = history.id;
      });
      setIdList(ids);
    }
  }, [allHistories]);

  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };

  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 아닌 값만 배열에 넣기
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  const givenRatings = useSelector((state) => state.rating).givenRating;
  const givenRatingIds = givenRatings.map((el) => el.id) || [];

  const givenReviews = useSelector((state) => state.review).givenReview;
  const givenReviewIds = givenReviews.map((el) => el.id) || [];

  // console.log(givenRatingIds);
  // const review = useSelector((state) => state.review).dogWalkers;

  // const givenRatingIds = givenRating.map((el) => el.historyId) || [];
  // const givenReviewIds = givenReview.map((el) => el.historyId);

  // console.log(givenReview);
  // console.log(givenRatingIds);
  // console.log(givenRating);
  const handleRatingOpen = (id) => {
    // console.log(dogwalkerId);
    // setHistoryInfo({ dogwalkerId: dogwalkerId, historyId: index });
    setHistoryInfo({ ...historyInfo, historyId: id });
    setOpenRating(true);
  };

  const handleRatingClose = () => {
    setOpenRating(false);
  };

  const handleReviewOpen = (id, date) => {
    setHistoryInfo({ ...historyInfo, historyId: id });
    setServiceDate(date);
    setOpenReview(true);
  };

  const handleReviewClose = () => {
    setOpenReview(false);
  };

  const handleReviewEditOpen = (id) => {
    givenReviews.forEach((el) => {
      if (el.id === id) {
        setTargetReview({
          id: el.id,
          content: el.content
        });
      }
    });
    setOpenReviewEdit(true);
  };

  // console.log(targetReview);
  const handleReviewEditClose = () => {
    setOpenReviewEdit(false);
  };

  const handleCancelRating = (el) => {
    console.log(el.id);
    // dispatch(untrackRating(el.id));
    // givenRating.forEach((el) => {
    //   if (el.historyId === idx) index = el.index;
    // });
    // dispatch(cancelRating(dogwalkerId, index));
    // dispatch(untrackRating(idx));
    // console.log(el.historyId);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/rating`, {
        data: { historyId: el.id },
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
          dispatch(untrackRating(el.id));
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          modal();
        } else console.log(error.response.data.message);
      });
    // window.location.reload();
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

  const handleHistoryDelete = () => {
    // console.log(CheckList);
    // dispatch(deleteHistory(CheckList));
    if (CheckList.length > 0) {
      axios
        .delete(process.env.REACT_APP_API_URL + '/history', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: {
            serviceId: CheckList
          }
        })
        .then((res) => {
          if (res.status === 200) {
            handleNotice(true);
            handleMessage('내역이 삭제되었습니다.');
            dispatch(deleteHistory(CheckList));
          }
        })
        .catch((error) => {
          if (error.response.status === 410) {
            modal();
          } else console.log(error.response.data.message);
        });
    } else {
      handleNotice(true);
      handleMessage('항목을 선택해주세요.');
    }
  };

  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          <div className='button-container'>
            <button onClick={handleHistoryDelete}>이용내역삭제</button>
          </div>
          <label className='all'>
            <input
              type='checkbox'
              className='select-all'
              onChange={onChangeAll}
              checked={!allHistories.length ? false : CheckList.length === IdList.length}
            /> <span>전체 선택</span>
          </label>
          {allHistories.length === 0
            ? <div>결과 없음</div>
            : allHistories.map((el, idx) => {
              return (
                <div className='card-container' key={idx}>
                  <input
                    type='checkbox'
                    className='select-one'
                    onChange={(e) => onChangeEach(e, el.id)}
                    checked={CheckList.includes(el.id)}
                  />
                  <div className='card'>
                    <img
                      className='dogwalker-img'
                      src={el.img}
                      alt={el.name}
                      onClick={() => handleClick(el.dogwalkerId)}
                    />
                    <div className='name'>{el.name}</div>
                    <div className='info'>{el.date} {el.time} {el.location}</div>
                    <div className='type'>{el.type} {el.duration}분 / {addComma(el.price)}원</div>
                    {givenRatingIds.includes(el.id)
                      ? (
                        <div
                          className='bnt rating'
                          onClick={() => handleCancelRating(el)}
                        >
                          평점 삭제
                        </div>
                        )
                      : (
                        <div className='bnt rating' onClick={() => handleRatingOpen(el.id)}>
                          평점 등록
                        </div>
                        )}
                    {givenReviewIds.includes(el.id)
                      ? (
                        <div
                          className='bnt review'
                          onClick={() => handleReviewEditOpen(el.id)}
                        >
                          리뷰 확인
                        </div>
                        )
                      : (
                        <div
                          className='bnt review'
                          onClick={() => handleReviewOpen(el.id, el.date)}
                        >
                          리뷰 등록
                        </div>
                        )}
                  </div>
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
              handleMessage={handleMessage}
              handleNotice={handleNotice}
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
