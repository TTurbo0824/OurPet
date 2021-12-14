import { RESET_HISTORY, GET_HISTORY, DELETE_HISTORY } from '../action';
import { initHistoryState } from './initialState/initialState';

function history (state = initHistoryState, action) {
  switch (action.type) {
    case RESET_HISTORY:
      return { dogWalkerHistory: [] };
    case GET_HISTORY:
      return { dogWalkerHistory: action.payload };
    case DELETE_HISTORY:
      return {
        ...state,
        dogWalkerHistory: state.dogWalkerHistory.filter((el) => !action.payload.includes(el.id))
      };
    default:
      return state;
  }
}

export default history;
