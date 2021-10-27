module.exports = {
  signup: require('./users/signup'),
  login: require('./users/login'),
  logout: require('./users/logout'),
  guest: require('./users/guest'),
  dogwalker: require('./dogwalkers/dogwalker'),
  myInfo: require('./mypage/myinfo'),
  editMyInfo: require('./mypage/edit-my-info'),
  withdrawal: require('./mypage/withdrawal'),
  myRequest: require('./request/myrequest'),
  request: require('./request/request'),
  cancelRequest: require('./request/cancel-request'),
  myHistory: require('./history/myhistory'),
  rating: require('./history/rating'),
  deleteRating: require('./history/delete-rating'),
  review: require('./history/review'),
  deleteReview: require('./history/delete-review')
};
