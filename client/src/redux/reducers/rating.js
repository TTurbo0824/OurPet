import { GIVE_RATING, CANCEL_RATING, TRACK_RATING } from '../action';
import { initRatingState } from './initialState/initRatingState';

function rating (state = initRatingState, action) {
  switch (action.type) {
    case GIVE_RATING:
      return {
        ...state,
        dogWalkers: state.dogWalkers.map((el) =>
          el.id === action.payload.id
            ? { ...el, rating: [...el.rating, action.payload.rating] }
            : el
        )
      };
    case CANCEL_RATING:
      return {
        ...state,
        dogWalkers: state.dogWalkers.map((el) =>
          el.id === action.payload.id
            ? { ...el, rating: el.rating.filter((_, idx) => idx !== action.payload.idx) }
            : el
        )
      };
    case TRACK_RATING:
      return {
        ...state,
        givenRating: [...state.givenRating, action.payload]
      };
    default:
      return state;
  }
}

export default rating;
