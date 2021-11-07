import { GIVE_RATING, CANCEL_RATING } from '../action';
import { initRatingState } from './initialState/initRatingState';

function rating (state = initRatingState, action) {
  switch (action.type) {
    case GIVE_RATING:
      return { ...state };
    case CANCEL_RATING:
      return { ...state };
    default:
      return state;
  }
}

export default rating;
