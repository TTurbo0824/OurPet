export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';

export const userLogin = (token, loginData) => ({
  type: LOG_IN,
  token,
  payload: loginData
});

export const userLogout = () => ({
  type: LOG_OUT
});

export const editInfo = (userData) => ({
  type: EDIT_INFO,
  payload: userData
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
