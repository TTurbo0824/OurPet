const moment = require('moment');

const getDate = (day) => {
  const now = new Date();
  let target = new Date(now.setDate(now.getDate() + day));
  target = moment(target).format('YYYY.MM.DD');
  return target;
};

export const initialUserState = {
  token: '',
  userInfo: {
    isExpired: false,
    email: '',
    nickname: ''
  }
};

export const initRequestState = {
  dogWalkerRequest: [
    {
      id: 1,
      dogwalkerId: 1,
      name: '안*영',
      type: '소형견',
      location: '서대문구',
      date: getDate(2),
      time: '오후 7시',
      duration: 60,
      price: 20000,
      status: 'pending'
    },
    {
      id: 2,
      dogwalkerId: 20,
      name: '장*빈',
      type: '중형견',
      location: '서대문구',
      date: getDate(5),
      time: '오후 7시',
      duration: 60,
      price: 15000,
      status: 'pending'
    }
  ]
};

export const initHistoryState = {
  dogWalkerHistory: [
    {
      id: 1,
      dogwalkerId: 1,
      name: '안*영',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      location: '서대문구',
      date: getDate(-6),
      type: '소형견',
      time: '오후 2시',
      duration: 60,
      price: 20000
    },
    {
      id: 2,
      dogwalkerId: 8,
      name: '이*윤',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      location: '성북구',
      type: '소형견',
      date: getDate(-4),
      time: '오후 7시',
      duration: 60,
      price: 22000
    },
    {
      id: 3,
      dogwalkerId: 1,
      name: '안*영',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      location: '서대문구',
      date: getDate(-1),
      type: '소형견',
      time: '오후 1시',
      duration: 30,
      price: 15000
    }
  ]
};
