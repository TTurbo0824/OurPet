import { GET_RATING, GIVE_RATING, EDIT_RATING, REMOVE_RATING } from '../action';
import { initRatingState } from './initialState/initRatingState';

function rating (state = initRatingState, action) {
  switch (action.type) {
    case GET_RATING:
      return {
        ...state,
        givenRating: action.payload
      };
    case GIVE_RATING:
      return {
        ...state,
        givenRating: [...state.givenRating, action.payload]
      };
    case EDIT_RATING:
      return {
        ...state,
        givenRating: state.givenRating.map((el) => {
          if (el.id === action.payload.id) el.rating = action.payload.rating;
          return el;
        })
      };
    case REMOVE_RATING:
      return {
        ...state,
        givenRating: state.givenRating.filter((el) => el.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default rating;
