
export const initDogWalkerState = {
  dogWalkers: [
    {
      id: 1,
      name: '안*영',
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
      name: '한*희',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['동대문구', '성동구', '중구'],
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
      name: '김*준',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강남구', '서초구', '송파구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [17000, 20000],
        대형견: [18000, 22000]
      },
      certified: true
    },
    {
      id: 4,
      name: '김*별',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['구로구', '금천구', '영등포구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 예절 교육', '산책 후 뒤처리'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [18000, 22000],
        대형견: [18000, 22000]
      },
      certified: true
    },
    {
      id: 5,
      name: '최*진',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강남구', '서초구', '송파구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: [15000, 20000],
        중형견: [15000, 20000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 6,
      name: '차*현',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강서구', '구로구', '양천구'],
      tags: ['소형견', '중형견', '야외 배변', '산책 후 뒤처리'],
      charges: {
        소형견: [12000, 15000],
        중형견: [12000, 15000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 7,
      name: '박*영',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강서구'],
      tags: ['소형견', '중형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: [15000, 18000],
        중형견: [15000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 8,
      name: '이*윤',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강북구', '노원구', '도봉구', '성북구'],
      tags: ['소형견', '중형견', '대형견', '야외 배변', '산책 후 뒤처리', '산책 예절 교육'],
      charges: {
        소형견: [17000, 20000],
        중형견: [17000, 20000],
        대형견: [18000, 22000]
      },
      certified: true
    },
    {
      id: 9,
      name: '김*수',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['광진구', '동대문구', '성동구', '중랑구'],
      tags: ['소형견', '중형견', '산책 예절 교육'],
      charges: {
        소형견: [15000, 20000],
        중형견: [15000, 20000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 10,
      name: '김*연',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['송파구', '강동구'],
      tags: ['소형견', '중형견', '야외 배변'],
      charges: {
        소형견: [15000, 18000],
        중형견: [15000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 11,
      name: '최*호',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['은평구'],
      tags: ['소형견', '중형견', '대형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: [15000, 18000],
        중형견: [15000, 18000],
        대형견: [18000, 22000]
      },
      certified: true
    },
    {
      id: 12,
      name: '정*경',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강서구', '마포구', '용산구'],
      tags: ['중형견', '대형견', '야외 배변'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [17000, 20000],
        대형견: [17000, 20000]
      },
      certified: true
    },
    {
      id: 13,
      name: '이*준',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['동작구', '양천구', '영등포구'],
      tags: ['소형견', '중형견', '야외 배변', '산책 후 뒤처리', '산책 예절 교육'],
      charges: {
        소형견: [12000, 18000],
        중형견: [12000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 14,
      name: '김*서',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['관악구', '금천구', '동작구', '서초구'],
      tags: ['소형견', '중형견', '야외 배변'],
      charges: {
        소형견: [12000, 18000],
        중형견: [12000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 15,
      name: '이*혜',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['노원구', '도봉구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 후 뒤처리'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [12000, 15000],
        대형견: [15000, 20000]
      },
      certified: true
    },
    {
      id: 16,
      name: '김*철',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['구로구', '양천구', '영등포구'],
      tags: ['소형견', '중형견', '대형견', '야외 배변', '산책 예절 교육'],
      charges: {
        소형견: [15000, 18000],
        중형견: [15000, 18000],
        대형견: [18000, 22000]
      },
      certified: true
    },
    {
      id: 17,
      name: '정*애',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['강동구', '광진구', '중랑구'],
      tags: ['중형견', '대형견', '야외 배변'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [17000, 20000],
        대형견: [17000, 20000]
      },
      certified: true
    },
    {
      id: 18,
      name: '현*채',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['동작구', '양천구', '영등포구'],
      tags: ['소형견', '중형견', '야외 배변', '산책 후 뒤처리'],
      charges: {
        소형견: [12000, 18000],
        중형견: [12000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 19,
      name: '김*나',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['용산구', '종로구', '중구', '성동구'],
      tags: ['소형견', '중형견', '야외 배변'],
      charges: {
        소형견: [12000, 18000],
        중형견: [12000, 18000],
        대형견: ['x', 'x']
      },
      certified: true
    },
    {
      id: 20,
      name: '장*빈',
      img: 'https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
      locations: ['마포구', '서대문구', '은평구'],
      tags: ['중형견', '대형견', '야외 배변', '산책 후 뒤처리'],
      charges: {
        소형견: ['x', 'x'],
        중형견: [12000, 15000],
        대형견: [15000, 20000]
      },
      certified: true
    }
  ]
};
