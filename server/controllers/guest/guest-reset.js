const { requests, histories, dogwalkers } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const moment = require('moment');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

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

      let allDogwalkers = await dogwalkers.findAll();
      allDogwalkers = Sequelize.getValues(allDogwalkers);

      const allRequests = await requests.findAll({
        order: [['id', 'DESC']]
      });

      const tempRequestId = allRequests[0].dataValues.id;

      const allHistories = await histories.findAll({
        order: [['id', 'DESC']]
      });

      const tempHistoryId = allHistories[0].dataValues.id;

      const defaultRequest = [
        {
          id: tempRequestId + 1,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          name: allDogwalkers[0].name,
          type: '소형견',
          location: '서대문구',
          date: getDate(2),
          time: '오후 7시',
          duration: 60,
          price: 20000
        },
        {
          id: tempRequestId + 2,
          userId: accessTokenData.id,
          dogwalkerId: 20,
          name: allDogwalkers[19].name,
          type: '중형견',
          location: '서대문구',
          date: getDate(5),
          time: '오후 7시',
          duration: 60,
          price: 15000
        },
        {
          id: tempRequestId + 3,
          userId: accessTokenData.id,
          dogwalkerId: 20,
          name: allDogwalkers[19].name,
          type: '중형견',
          location: '서대문구',
          date: getDate(5),
          time: '오후 7시',
          duration: 60,
          price: 15000
        }
      ];

      const defaultHistory = [
        {
          id: tempHistoryId + 1,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          name: allDogwalkers[0].name,
          location: '서대문구',
          date: getDate(-6),
          type: '소형견',
          time: '오후 2시',
          duration: 60,
          price: 20000
        },
        {
          id: tempHistoryId + 2,
          userId: accessTokenData.id,
          dogwalkerId: 8,
          name: allDogwalkers[7].name,
          location: '성북구',
          type: '소형견',
          date: getDate(-4),
          time: '오후 7시',
          duration: 60,
          price: 22000
        },
        {
          id: tempHistoryId + 3,
          userId: accessTokenData.id,
          dogwalkerId: 1,
          name: allDogwalkers[0].name,
          location: '서대문구',
          date: getDate(-1),
          type: '소형견',
          time: '오후 1시',
          duration: 30,
          price: 15000
        }
      ];

      await requests.bulkCreate(defaultRequest);
      await histories.bulkCreate(defaultHistory);

      res.status(200).json({ message: 'ok', data: { allRequests: defaultRequest, allHistories: defaultHistory } });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
