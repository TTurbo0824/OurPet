import {LOG_IN, LOG_OUT, TOKEN_EXPIRED} from '../action';
import {initialState} from './initialState';

function user(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.token,
        userInfo: [
          {
            isExpired: false,
            nickname: action.payload,
          },
        ],
      };
    case LOG_OUT:
      return {
        ...state,
        token: '',
        userInfo: [{isExpired: false, nickname: ''}],
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        userInfo: [...state.userInfo, {isExpired: true}],
      };
    default:
      return state;
  }
}

export default user;
