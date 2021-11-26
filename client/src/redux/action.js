export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';
export const GET_HISTORY = 'GET_HISTORY';
export const GIVE_RATING = 'GIVE_RATING';
export const TRACK_RATING = 'TRACK_RATING';
export const UNTRACK_RATING = 'UNTRACK_RATING';
export const CANCEL_RATING = 'CANCEL_RATING';
export const POST_REVIEW = 'POST_REVIEW';
export const TRACK_REVIEW = 'TRACK_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const UNTRACK_REVIEW = 'UNTRACK_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';

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

export const untrackRating = (id) => ({
  type: UNTRACK_RATING,
  payload: { id }
});

export const cancelRating = (id, idx) => ({
  type: CANCEL_RATING,
  payload: { id, idx }
});

export const postReview = (id, nickname, content, date) => ({
  type: POST_REVIEW,
  payload: { id, nickname, content, date }
});

export const trackReview = (reviewInfo) => ({
  type: TRACK_REVIEW,
  payload: reviewInfo
});

export const untrackReview = (id) => ({
  type: UNTRACK_REVIEW,
  payload: { id }
});

export const deleteReview = (id, idx) => ({
  type: DELETE_REVIEW,
  payload: { id, idx }
});

export const editReview = (id, idx, content) => ({
  type: EDIT_REVIEW,
  payload: { id, idx, content }
});
