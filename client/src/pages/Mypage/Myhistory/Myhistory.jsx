import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteHistory, removeRating } from '../../../redux/action';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { Colors } from '../../../components/utils/_var';
import { MyPageTable } from '../../../components/MyPageTable';
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
  .field-container  {
    grid-template-areas:
      'alls select';
    grid-template-columns: 1fr 1fr;
  }
  .card {
    grid-template-areas:
      'check img title rating review'
      'check img info rating review'
      'check img type rating review';
  }
  .dogwalker-img {
    cursor: pointer;
    grid-area: img;
    width: 6rem;
    height: 6rem;
    border: 0.5px solid rgb(238, 238, 238);
    object-fit: cover;
  }
  .rating {
    grid-area: rating;
  }
  .review {
    grid-area: review;
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
  // document.querySelectorAll('input[type=checkbox]').forEach( el => {console.log(el.checked)} );
  // document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );

  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.user).token;
  const [openRating, setOpenRating] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openReviewEdit, setOpenReviewEdit] = useState(false);
  const [historyInfo, setHistoryInfo] = useState({ historyId: null, historyIndex: null });
  const [serviceDate, setServiceDate] = useState(null);
  const [targetReview, setTargetReview] = useState({
    id: null,
    content: null
  });
  const [IdList, setIdList] = useState([]);
  const [CheckList, setCheckList] = useState([]);

  const allHistories = useSelector((state) => state.history).dogWalkerHistory;
  // console.log(allHistories);

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
  const givenReviews = useSelector((state) => state.review).givenReview;
  const givenRatingIds = givenRatings.map((el) => el.id) || [];
  const givenReviewIds = givenReviews.map((el) => el.id) || [];

  const handleRatingOpen = (id) => {
    // console.log(dogwalkerId);
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
    // console.log(el.id);
    // dispatch(removeRating(el.id));

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
          dispatch(removeRating(el.id));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          modal();
        } else console.log('error: ', error.response.data.message);
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
    if (allHistories.length === 0) {
      handleNotice(true);
      handleMessage('삭제할 내역이 없습니다.');
    } else if (CheckList.length > 0) {
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
          if (error.response.status === 401) {
            modal();
          } else console.log('error: ', error.response.data.message);
        });
    } else {
      handleNotice(true);
      handleMessage('항목을 선택해주세요.');
    }
  };

  const handleSearchClicked = () => {
    history.push({
      pathname: '/search'
    });
  };

  return (
    <MyHistoryWrapper>
      <TopNavigation />
      <div className='main'>
        <div className='container'>
          <MyPageTable>
            <div className='field-container '>
              <label className='all'>
                <input
                  type='checkbox'
                  className='select-all'
                  onChange={onChangeAll}
                  checked={CheckList.length !== 0 ? CheckList.length === IdList.length : false}
                  disabled={!allHistories.length ? 'disable' : null}
                />
                <span className='description'>전체선택</span>
              </label>
              <div className='delete-bnt description select' onClick={handleHistoryDelete}>선택내역삭제</div>
            </div>
            {allHistories.length === 0
              ? <div>
                <div className='no-items'>이용 내역이 없습니다. {'\n'} 내 주변 도크워커를 찾아보세요!</div>
                <button className='search-bnt' onClick={handleSearchClicked}>도그워커 찾기</button>
                </div>
              : allHistories.map((el, idx) => {
                return (
                  <div className='card' key={idx}>
                    <input
                      type='checkbox'
                      className='select-one'
                      onChange={(e) => onChangeEach(e, el.id)}
                      checked={CheckList.includes(el.id)}
                    />
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
                );
              })}
          </MyPageTable>
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
