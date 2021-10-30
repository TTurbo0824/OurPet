import { REQUEST_DOGWALKER, CANCEL_DOGWALKER } from '../action';
import { initDogWalkerState } from './initialState';

function dogwalker (state = initDogWalkerState, action) {
  switch (action.type) {
    case REQUEST_DOGWALKER:
      return { ...state };
    case CANCEL_DOGWALKER:
      return { ...state };
    default:
      return state;
  }
}

export default dogwalker;
