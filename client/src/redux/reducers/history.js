import { RESET_HISTORY, GET_HISTORY } from '../action';
import { initHistoryState } from './initialState/initialState';

function history (state = initHistoryState, action) {
  switch (action.type) {
    case RESET_HISTORY:
      return { dogWalkerHistory: [] };
    case GET_HISTORY:
      return { ...state };
    default:
      return state;
  }
}

export default history;
