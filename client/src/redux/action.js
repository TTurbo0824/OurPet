export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const RESET_REQUEST = 'RESET_REQUEST';
export const GET_REQUEST = 'GET_REQUEST';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';
export const RESET_HISTORY = 'RESET_HISTORY';
export const GET_HISTORY = 'GET_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const GET_RATING = 'GET_RATING';
export const GIVE_RATING = 'GIVE_RATING';
export const TRACK_RATING = 'TRACK_RATING';
export const UNTRACK_RATING = 'UNTRACK_RATING';
export const CANCEL_RATING = 'CANCEL_RATING';
export const GET_REVIEW = 'GET_REVIEW';
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

export const editInfo = (nickname) => ({
  type: EDIT_INFO,
  payload: nickname
});

export const resetRequest = () => ({
  type: RESET_REQUEST
});

export const getRequest = (request) => ({
  type: GET_REQUEST,
  payload: request
});

export const requestDogwalker = (request) => ({
  type: REQUEST_DOGWALKER,
  payload: request
});

export const cancelDogwalker = (ids) => ({
  type: CANCEL_DOGWALKER,
  payload: ids
});

export const resetHistory = () => ({
  type: RESET_HISTORY
});

export const getHistory = (history) => ({
  type: GET_HISTORY,
  payload: history
});

export const deleteHistory = (ids) => ({
  type: DELETE_HISTORY,
  payload: ids
});

export const getRating = (rating) => ({
  type: GET_RATING,
  payload: rating
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

export const getReview = (review) => ({
  type: GET_REVIEW,
  payload: review
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

export const editReview = (id, content) => ({
  type: EDIT_REVIEW,
  payload: { id, content }
});
