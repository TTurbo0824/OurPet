import { GET_REVIEW, POST_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from '../action';
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
        givenReview: [...state.givenReview, action.payload]
      };
    case DELETE_REVIEW:
      return {
        ...state,
        givenReview: state.givenReview.filter((el) => el.id !== action.payload.id)
      };
    case EDIT_REVIEW:
      return {
        ...state,
        givenReview: state.givenReview.map((el) => {
          if (el.id === action.payload.id) el.content = action.payload.content;
          return el;
        })
      };
    default:
      return state;
  }
}

export default review;
