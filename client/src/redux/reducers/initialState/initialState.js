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
      type: '소형견',
      location: '서대문구',
      date: '2021.11.03',
      time: '오후 2시',
      duration: 60,
      price: 20000,
      status: 'pending'
    }
  ]
};

export const initHistoryState = {
  dogWalkerHistory: [
    {
      id: 1,
      name: '안*영',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      location: '서대문구',
      type: '소형견',
      time: '오후 2시',
      duration: 60,
      price: 20000
    }
  ]
};
