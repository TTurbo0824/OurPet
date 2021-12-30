import { LOG_IN, LOG_OUT, EDIT_INFO, EDIT_PROFILE } from '../action';
import { initialUserState } from './initialState/initialState';

function user (state = initialUserState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        token: action.token,
        walkingDogUserInfo: {
          email: action.payload.email,
          nickname: action.payload.nickname,
          profile_url: action.payload.img_url
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        token: '',
        walkingDogUserInfo: { email: '', nickname: '', profile_url: '' }
      });
    case EDIT_INFO:
      return {
        ...state,
        walkingDogUserInfo: {
          ...state.walkingDogUserInfo,
          nickname: action.payload
        }
      };
    case EDIT_PROFILE:
      return {
        ...state,
        walkingDogUserInfo: {
          ...state.walkingDogUserInfo,
          profile_url: action.payload
        }
      };
    default:
      return state;
  }
}

export default user;
