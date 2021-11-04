import { POST_REVIEW, DELETE_REVIEW } from '../action';
import { initReviewState } from './initialState';

function review (state = initReviewState, action) {
  switch (action.type) {
    case POST_REVIEW:
      return { ...state };
    case DELETE_REVIEW:
      return { ...state };
    default:
      return state;
  }
}

export default review;
