import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
const ReviewWrapper = styled.div`
  .review {
    margin-bottom: 1rem;
    /* border: 1px solid black; */
  }
  .h-line {
    width: 100%;
    height: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgb(175, 175, 175, 0.4);
  }
  .nickname {
      margin-bottom: .5rem;
  }
  .date {
      font-size: .9rem;
      color: ${Colors.darkGray};
  }
  .content {
      margin-top: .5rem;
  }
`;

function ReviewContainer ({ reviews }) {
  return (
    <ReviewWrapper>
      {reviews.map((review, idx) => (
        <div className='review' key={idx}>
          <div className='nickname'>{review.nickname}</div>
          <div className='date'>서비스 이용 날짜: {review.date}</div>
          <div className='content'>{review.content}</div>
          {idx !== reviews.length - 1 ? <div className='h-line' /> : null}
        </div>
      ))}
    </ReviewWrapper>
  );
}

export default ReviewContainer;
