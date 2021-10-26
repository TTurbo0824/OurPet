import { LOG_IN, LOG_OUT, TOKEN_EXPIRED } from '../action';

const initialState = {
  token: '',
  isExpired: false,
  userID: ''
};

function user (state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        token: action.payload.token,
        isExpired: false,
        userID: action.payload.userID
      });
    case LOG_OUT:
      return {
        token: '',
        isExpired: false,
        userID: ''
      };
    case TOKEN_EXPIRED:
      return Object.assign({}, state, {
        token: action.payload.token,
        isExpired: true,
        userID: action.payload.userID
      });
    default:
      return state;
  }
}

export default user;
