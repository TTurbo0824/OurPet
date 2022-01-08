import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editReview } from '../../redux/action';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';
import pug from '../../images/pug.jpeg';
import minipin from '../../images/minipin.jpeg';
import corgi from '../../images/corgi.jpeg';
import default_profile from '../../images/default_profile.png';

const ReviewWrapper = styled.div`
  margin-bottom: 3rem;
  color: ${Colors.black};
  .review {
    margin-bottom: .9rem;
  }
  .user-info {
    display: grid;
    grid-template-areas:
      'img nickname bnt'
      'img date bnt';
    grid-template-columns: 4.7rem 1fr 4rem;
  }
  .profile-container {
    grid-area: img;
    width: 3.5rem;
    height: 3.5rem;
    overflow: hidden;
    position: relative;
    border-radius: 50px;
  }
  .review-profile {
    width: 3.5rem;
    height: 3.5rem;
    object-fit: cover
  }
  .h-line {
    width: 100%;
    height: 1.2rem;
    border-bottom: 1px solid rgb(175, 175, 175, 0.4);
  }
  .bnt-container {
    grid-area: bnt;
    display: flex;
  }
  .review-bnt {
    cursor: pointer;
    margin-left: .65rem;
    font-size: .9rem;
    color: ${Colors.gray};
    :hover {
      color: ${Colors.yellow};
    }
  }
  .nickname {
    grid-area: nickname;
    margin-bottom: .5rem;
    font-size: .95rem;
    ${media.tabletMini`font-size: 1rem;`}
  }
  .date {
    grid-area: date;
    font-size: .85rem;
    color: ${Colors.darkGray};
  }
  .content {
    margin-top: 1rem;
    color: ${Colors.darkGray};
    line-height: 1.75rem;
    font-size: .9rem;
    ${media.tabletMini`font-size: .95rem;`}
  }
  .dogwalker-review {
    margin: 1rem 0 1.5rem;
    font-size: 1.05rem;
    ${media.tabletMini`font-size: 1.2rem;`}
    font-weight: bold;
  }
  .rating {
    margin-left: auto;
    margin-right: 0;
    font-size: .98rem;
    ${media.tabletMini`font-size: 1rem;`}
  }
  .star-icon {
    margin-right: .3rem;
    color: ${Colors.yellow};
  }
`;

const ReviewInput = styled.textarea`
  display: flex;
  width: 100%;
  height: 5rem;
  margin: 1rem auto 0;
  line-height: 1.75rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: .9rem;
  ${media.tabletMini`font-size: .95rem;`}
  color: ${Colors.darkGray};
  padding: 0 .4rem;
  border: 1px solid ${Colors.mediumLightGray};
  resize: none;
  border-radius: 3px;
  :focus {
    outline: none;
  }
`;

function ReviewContainer ({ token, modal, handleMessage, handleNotice, averageRating, rating, reviews }) {
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.user).walkingDogUserInfo.nickname;
  const profileImage = [pug, minipin, corgi];
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleEditOpen = (id, content) => {
    if (!editOpen) {
      setEditInput(content);
      setEditId(id);
      setEditOpen(true);
    } else if (editOpen && id === editId) {
      if (editInput.length < 10) {
        handleNotice(true);
        handleMessage('리뷰를 10자 이상 작성해주세요');
      } else if (editInput === content) {
        handleNotice(true);
        handleMessage('수정 사항을 입력해주세요.');
      } else {
        axios
          .patch(`${process.env.REACT_APP_API_URL}/review`, { id: id, content: editInput }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              handleNotice(true);
              handleMessage('리뷰가 수정되었습니다.!');
              dispatch(editReview(id, editInput));
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              modal();
            } else {
              handleNotice(true);
              handleMessage('오류가 발생했습니다.');
              console.log('error: ', error.response.data.message);
            }
          });
      }
    } else {
      setEditOpen(false);
      setEditId(null);
      setEditInput('');
    }
  };

  const handleEditInput = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditCancel = () => {
    if (editOpen) {
      setEditOpen(false);
      setEditId(null);
      setEditInput('');
    }
  };

  const handleDelete = (id) => {
    handleNotice(true);
    handleMessage(`리뷰를 삭제하시겠습니까?!${id}#`);
  };

  return (
    <ReviewWrapper>
      <div className='review-rating'>
        <div className='title dogwalker-review'>도그워커 리뷰</div>
        <div className='rating'>
          <FontAwesomeIcon className='star-icon' icon={faStar} />
          {averageRating} ({rating.length})
        </div>
      </div>
      {reviews.map((review, idx) => (
        <div className='review' key={idx}>
          <div className='user-info'>
            {userNickname === review.nickname
              ? <div className='bnt-container'>
                <FontAwesomeIcon
                  className='review-bnt'
                  icon={faEdit}
                  onClick={() => handleEditOpen(review.id, review.content)}
                />
                {editOpen && editId === review.id
                  ? <FontAwesomeIcon
                      className='review-bnt'
                      onClick={handleEditCancel}
                      icon={faTimes}
                    />
                  : <FontAwesomeIcon
                      className='review-bnt'
                      onClick={() => handleDelete(review.id)}
                      icon={faTrash}
                    />}
                </div>
              : null}
            <div className='profile-container'>
              {idx < 3
                ? <img className='review-profile' alt='profile' src={profileImage[idx]} />
                : <img className='review-profile' alt='profile' src={review.profile_url || default_profile} />}
            </div>
            <div className='nickname'>{review.nickname}</div>
            <div className='date'>서비스 이용 날짜: {review.date}</div>
          </div>
          {editOpen && review.id === editId
            ? <ReviewInput onChange={handleEditInput} value={editInput} />
            : <div className='content'>{review.content}</div>}
          {idx !== reviews.length - 1 ? <div className='h-line' /> : null}
        </div>
      ))}
    </ReviewWrapper>
  );
}

export default ReviewContainer;
