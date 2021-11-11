export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';
export const GET_HISTORY = 'GET_HISTORY';
export const GIVE_RATING = 'GIVE_RATING';
export const TRACK_RATING = 'TRACK_RATING';
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

export const cancelDogwalker = (id) => ({
  type: CANCEL_DOGWALKER,
  payload: { id }
});

export const getHistory = () => ({
  type: GET_HISTORY
});

export const giveRating = (id, rating) => ({
  type: GIVE_RATING,
  payload: { id, rating }
});

export const trackRating = (ratingInfo) => ({
  type: TRACK_RATING,
  payload: ratingInfo
});

export const cancelRating = (id, idx) => ({
  type: CANCEL_RATING,
  payload: { id, idx }
});

export const postReview = () => ({
  type: POST_REVIEW
});

export const deleteReview = () => ({
  type: DELETE_REVIEW
});
