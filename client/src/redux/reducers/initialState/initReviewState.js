const moment = require('moment');

const getDate = (day) => {
  const now = new Date();
  let target = new Date(now.setDate(now.getDate() + day));
  target = moment(target).format('YYYY.MM.DD');
  return target;
};

export const initReviewState = {
  dogWalkers: [
    {
      id: 1,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 2,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 3,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 4,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 5,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 6,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 7,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 8,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 9,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 10,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 11,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 12,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 13,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 14,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 15,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 16,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 17,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 18,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 19,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    },
    {
      id: 20,
      review: [
        { nickname: 'abc123', content: '만족합니다', date: getDate(-4) },
        { nickname: 'testuser', content: '감사합니다', date: getDate(-2) }
      ]
    }
  ],
  givenReview: []
};
