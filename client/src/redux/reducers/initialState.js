export const initialUserState = {
  token: '',
  userInfo: {
    isExpired: false,
    email: '',
    nickname: ''
  }
};

export const initDogWalkerState = {
  dogWalkers: [
    {
      id: 1,
      name: 'doglover123',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['서대문구', '종로구', '중구'],
      tags: ['소형견', '중형견', '대형견', '야외 배변'],
      charges: {
        소형견: [15000, 20000],
        중형견: [15000, 20000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 2,
      name: '초롱이엄마',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강남구', '서대문구', '종로구', '중구'],
      tags: ['소형견', '중형견', '야외 배변', '산책 후 뒤처리'],
      charges: {
        소형견: [15000, 20000],
        중형견: [15000, 20000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 3,
      name: '김워커',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강남구', '서초구', '송파구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [17000, 20000],
        대형견: [18000, 22000]
      },
      certified: true
    }
  ]
};

export const initRequestState = {
  dogWalkerRequest: [
    {
      id: 1,
      dogwalkerId: 1,
      type: '소형견',
      location: '서대문구',
      date: '2021.11.03',
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
      name: 'doglover123',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      location: '서대문구',
      type: '소형견',
      time: 12,
      duration: 60,
      price: 20000
    }
  ]
};

export const initRatingState = {
  dogWalkers: [
    {
      id: 1,
      rating: [4, 5, 5, 4, 5]
    },
    {
      id: 2,
      rating: [5, 5, 5, 5, 5, 5]
    },
    {
      id: 3,
      rating: [5, 5, 5, 5, 5, 5, 4, 4, 4, 5, 5, 5]
    }
  ]
};

export const initReviewState = {
  dogWalkers: [
    {
      id: 1,
      review: [
        { nickname: 'abc123', content: '만족합니다' },
        { nickname: 'testuser', content: '감사합니다' }
      ]
    },
    {
      id: 2,
      review: [
        { nickname: 'abc123', content: '만족합니다' },
        { nickname: 'testuser', content: '감사합니다' }
      ]
    },
    {
      id: 3,
      review: [
        { nickname: 'abc123', content: '만족합니다' },
        { nickname: 'testuser', content: '감사합니다' }
      ]
    }
  ]
};
