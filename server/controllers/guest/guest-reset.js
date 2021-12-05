const { requests, histories } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    // const accessTokenData = { id: req.headers.authorization };
    // console.log(accessTokenData.id);
    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const getDate = (day) => {
        const now = new Date();
        let target = new Date(now.setDate(now.getDate() + day));
        target = moment(target).format('YYYY.MM.DD');
        return target;
      };

      const defaultRequest = [
        {
          requestId: 1,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          type: '소형견',
          location: '서대문구',
          date: getDate(2),
          time: '오후 7시',
          duration: 60,
          price: 20000,
          status: 'pending'
        },
        {
          requestId: 2,
          userId: accessTokenData.id,
          dogwalkerId: 20,
          type: '중형견',
          location: '서대문구',
          date: getDate(5),
          time: '오후 7시',
          duration: 60,
          price: 15000,
          status: 'pending'
        },
        {
          requestId: 3,
          userId: accessTokenData.id,
          dogwalkerId: 20,
          type: '중형견',
          location: '서대문구',
          date: getDate(5),
          time: '오후 7시',
          duration: 60,
          price: 15000,
          status: 'pending'
        }
      ];

      const defaultHistory = [
        {
          historyId: 1,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          location: '서대문구',
          date: getDate(-6),
          type: '소형견',
          time: '오후 2시',
          duration: 60,
          price: 20000
        },
        {
          historyId: 2,
          userId: accessTokenData.id,
          dogwalkerId: 8,
          location: '성북구',
          type: '소형견',
          date: getDate(-4),
          time: '오후 7시',
          duration: 60,
          price: 22000
        },
        {
          historyId: 3,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          location: '서대문구',
          date: getDate(-1),
          type: '소형견',
          time: '오후 1시',
          duration: 30,
          price: 15000
        }
      ];

      requests.bulkCreate(defaultRequest);
      histories.bulkCreate(defaultHistory);

      res.status(200).json({ message: 'ok' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
