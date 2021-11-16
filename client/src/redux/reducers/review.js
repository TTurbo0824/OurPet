import { POST_REVIEW, DELETE_REVIEW, TRACK_REVIEW } from '../action';
import { initReviewState } from './initialState/initReviewState';

function review (state = initReviewState, action) {
  switch (action.type) {
    case POST_REVIEW:
      return {
        ...state,
        dogWalkers: state.dogWalkers.map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                review: [
                  ...el.review,
                  { nickname: action.payload.nickname, content: action.payload.content, date: action.payload.date }
                ]
              }
            : el
        )
      };
    case DELETE_REVIEW:
      return {
        ...state,
        dogWalkers: state.dogWalkers.map((el) =>
          el.id === action.payload.id
            ? { ...el, review: el.review.filter((_, idx) => idx !== action.payload.idx) }
            : el
        )
      };
    case TRACK_REVIEW:
      return {
        ...state,
        givenReview: [...state.givenReview, action.payload]
      };
    default:
      return state;
  }
}

export default review;
