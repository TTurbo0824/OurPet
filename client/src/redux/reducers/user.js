import { LOG_IN, LOG_OUT, EDIT_INFO, TOKEN_EXPIRED } from '../action';
import { initialUserState } from './initialState/initialState';

function user (state = initialUserState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        token: action.token,
        userInfo: {
          isExpired: false,
          email: action.payload.email,
          nickname: action.payload.nickname
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        token: '',
        userInfo: { isExpired: false, email: '', nickname: '' }
      });
    case EDIT_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          nickname: action.payload.nickname
        }
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          isExpired: true
        }
      };
    default:
      return state;
  }
}

export default user;
