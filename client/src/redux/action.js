export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';
export const GET_HISTORY = 'GET_HISTORY';
export const GIVE_RATING = 'GIVE_RATING';
export const CANCEL_RATING = 'CANCEL_RATING';
export const POST_REVIEW = 'POST_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

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

export const requestDogwalker = (request) => ({
  type: REQUEST_DOGWALKER,
  payload: request
});

export const cancelDogwalker = () => ({
  type: CANCEL_DOGWALKER
});

export const getHistory = () => ({
  type: GET_HISTORY
});

export const giveRating = () => ({
  type: GIVE_RATING
});

export const cancelRating = () => ({
  type: CANCEL_RATING
});

export const postReview = () => ({
  type: POST_REVIEW
});

export const deleteReview = () => ({
  type: DELETE_REVIEW
});
