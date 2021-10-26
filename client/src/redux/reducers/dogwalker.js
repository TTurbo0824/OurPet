import {REQUEST_DOGWALKER, CANCEL_DOGWALKER} from '../action';
import {initialState} from './initialState';

function dogwalker(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DOGWALKER:
      return {...state};
    case CANCEL_DOGWALKER:
      return {...state};
    default:
      return state;
  }
}

export default dogwalker;
