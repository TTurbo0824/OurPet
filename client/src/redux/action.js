export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const EDIT_INFO = 'EDIT_INFO';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const RESET_REQUEST = 'RESET_REQUEST';
export const GET_REQUEST = 'GET_REQUEST';
export const REQUEST_DOGWALKER = 'REQUEST_DOGWALKER';
export const CANCEL_DOGWALKER = 'CANCEL_DOGWALKER';
export const RESET_HISTORY = 'RESET_HISTORY';
export const GET_HISTORY = 'GET_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const GET_RATING = 'GET_RATING';
export const GIVE_RATING = 'GIVE_RATING';
export const EDIT_RATING = 'EDIT_RATING';
export const REMOVE_RATING = 'REMOVE_RATING';
export const GET_REVIEW = 'GET_REVIEW';
export const POST_REVIEW = 'POST_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
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

export const editProfile = (img_url) => ({
  type: EDIT_PROFILE,
  payload: img_url
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

export const giveRating = (ratingInfo) => ({
  type: GIVE_RATING,
  payload: ratingInfo
});

export const editRating = (id, rating) => ({
  type: EDIT_RATING,
  payload: { id, rating }
});

export const removeRating = (id) => ({
  type: REMOVE_RATING,
  payload: { id }
});

export const getReview = (review) => ({
  type: GET_REVIEW,
  payload: review
});

export const postReview = (reviewInfo) => ({
  type: POST_REVIEW,
  payload: reviewInfo
});

export const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  payload: { id }
});

export const editReview = (id, content) => ({
  type: EDIT_REVIEW,
  payload: { id, content }
});
