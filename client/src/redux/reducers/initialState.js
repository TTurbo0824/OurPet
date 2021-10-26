export const initialState = {
  token: '',
  userInfo: [
    {
      isExpired: false,
      nickname: ''
    }
  ],
  dogWalkers: [
    {
      id: 1,
      name: 'doglover123',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['종로구', '서대문구', '중구'],
      tags: ['소형견', '중형견', '야외배변'],
      charges: {
        소형견30: 15000,
        중형견30: 15000,
        소형견60: 20000,
        중형견60: 20000
      },
      certified: true
    },
    {
      id: 2,
      name: '초롱이엄마',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['종로구', '서대문구', '중구'],
      tags: ['소형견', '중형견', '야외배변'],
      charges: {
        소형견30: 15000,
        중형견30: 15000,
        소형견60: 20000,
        중형견60: 20000
      },
      certified: true
    },
    {
      id: 3,
      name: '김워커',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강남구', '송파구', '서초구'],
      tags: ['중형견', '대형견', '야외배변', '산책후뒤처리'],
      charges: {
        중형견30: 15000,
        대형견30: 18000,
        중형견60: 20000,
        대형견60: 22000
      },
      certified: true
    }
  ],
  dogWalkerRequest: [],
  dogWalkerHistory: [
    {
      id: 1,
      name: 'doglover123',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['종로구', '서대문구', '중구'],
      tags: ['소형견', '중형견', '야외배변'],
      charges: {
        소형견30: 15000,
        중형견30: 15000,
        소형견60: 20000,
        중형견60: 20000
      },
      certified: true
    }
  ]
};
