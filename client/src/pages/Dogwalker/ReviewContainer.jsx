import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../components/utils/_var';
import pug from '../../images/pug.jpeg';
import minipin from '../../images/minipin.jpeg';

const ReviewWrapper = styled.div`
  .review {
    margin-bottom: 1rem;
    /* border: 1px solid black; */
    /* background-color: lightsteelblue; */
  }
  .user-info {
      display: grid;
      grid-template-areas:
      'img nickname'
      'img date';
      grid-template-columns: 4.7rem 1fr;
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
  }
  .h-line {
    width: 100%;
    height: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgb(175, 175, 175, 0.4);
  }
  .nickname {
    grid-area: nickname;
    margin-bottom: 0.5rem;
  }
  .date {
    grid-area: date;
    font-size: 0.85rem;
    color: ${Colors.darkGray};
  }
  .content {
    margin-top: 1rem;
    line-height: 1.75rem;
    font-size: 0.95rem;
    color: ${Colors.darkGray};
  }
  .dogwalker-review {
    margin: 1rem 0 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .rating {
    margin-left: auto;
    margin-right: 0;
  }
  .star-icon {
    margin-right: 0.3rem;
    color: ${Colors.yellow};
  }
`;

function ReviewContainer ({ averageRating, rating, reviews }) {
  const profileImage = [pug, minipin];

  return (
    <ReviewWrapper>
      <div className='review-rating'>
        <div className='title dogwalker-review'>도그워커 리뷰</div>
        <div className='rating'>
          <FontAwesomeIcon className='star-icon' icon={faStar} size='1x' />
          {averageRating} ({rating.length})
        </div>
      </div>
      {reviews.map((review, idx) => (
        <div className='review' key={idx}>
          <div className='user-info'>
            <div className='profile-container'>
              <img className='review-profile' src={profileImage[idx]} />
            </div>
            <div className='nickname'>{review.nickname}</div>
            <div className='date'>서비스 이용 날짜: {review.date}</div>
          </div>
          <div className='content'>{review.content}</div>
          {idx !== reviews.length - 1 ? <div className='h-line' /> : null}
        </div>
      ))}
    </ReviewWrapper>
  );
}

export default ReviewContainer;
