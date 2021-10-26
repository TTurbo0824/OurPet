export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

export const userLogin = (token, userID) => ({
  type: LOG_IN,
  payload: {
    token,
    userID
  }
});

export const userLogout = () => ({
  type: LOG_OUT
});

export const tokenExpired = (token, isExpired, userID) => ({
  type: TOKEN_EXPIRED,
  payload: {
    token,
    isExpired,
    userID
  }
});
