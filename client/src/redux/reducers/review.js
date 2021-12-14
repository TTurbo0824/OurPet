import { GET_REVIEW, POST_REVIEW, DELETE_REVIEW, EDIT_REVIEW, TRACK_REVIEW, UNTRACK_REVIEW } from '../action';
import { initReviewState } from './initialState/initReviewState';

function review (state = initReviewState, action) {
  switch (action.type) {
    case GET_REVIEW:
      return {
        ...state,
        givenReview: action.payload
      };
    case POST_REVIEW:
      return {
        ...state,
        dogWalkers: state.dogWalkers.map((el) =>
          el.id === action.payload.id
            ? {
                ...el,
                review: [
                  ...el.review,
                  {
                    nickname: action.payload.nickname,
                    content: action.payload.content,
                    date: action.payload.date
                  }
                ]
              }
            : el
        )
      };
    case EDIT_REVIEW:
      return {
        ...state,
        givenReview: state.givenReview.map((el) => {
          if (el.id === action.payload.id) el.content = action.payload.content;
          return el;
        })
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
    case UNTRACK_REVIEW:
      return {
        ...state,
        givenReview: state.givenReview.filter((el) => el.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default review;
