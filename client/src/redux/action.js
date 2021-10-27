export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';

export const userLogin = (token, nickname) => ({
  type: LOG_IN,
  token,
  payload: nickname
});

export const userLogout = () => ({
  type: LOG_OUT
});

export const tokenExpired = () => ({
  type: TOKEN_EXPIRED
});

export const requestDogwalker = () => ({
  type: REQUEST_DOGWALKER
});

export const cancelDogwalker = () => ({
  type: CANCEL_DOGWALKER
});
