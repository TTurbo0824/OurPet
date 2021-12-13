const { requests, dogwalkers } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization.id);
    // const accessTokenData = { id: req.headers.authorization };
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      let allDogwalkers = await dogwalkers.findAll();
      allDogwalkers = Sequelize.getValues(allDogwalkers);

      let allRequests = await requests.findAll({
        where: {
          userId: accessTokenData.id
        }
      });
      // console.log(allRequests);

      if (allRequests) {
        allRequests = Sequelize.getValues(allRequests);
        allRequests = allRequests.map((request) => {
          const now = new Date();
          const target = moment(now);
          let requestTime = 0;

          if (request.time === '오전 12시') {
            requestTime = 0;
          } else if (request.time === '오후 12시') {
            requestTime = 12;
          } else if (request.time[1] === '후') {
            requestTime = Number(request.time.split(' ')[1].slice(0, -1)) + 12;
          } else {
            requestTime = Number(request.time.split(' ')[1].slice(0, -1));
          }

          console.log(requestTime);
          const dateTime = `${request.date} ${requestTime}`;
          const requestDate = moment(dateTime, 'YYYY.MM.DD H');
          if (requestDate.from(target).includes('ago')) {
            request.status = 'expired';
          }

          return {
            id: request.id,
            dogwalkerId: request.dogwalkerId,
            name: allDogwalkers[request.dogwalkerId - 1].name,
            img: allDogwalkers[request.dogwalkerId - 1].profile,
            date: request.date,
            type: request.type,
            duration: request.duration,
            time: request.time,
            location: request.location,
            price: request.price,
            status: request.status
          };
        });
        res.status(200).json({ data: allRequests, message: 'ok' });
      } else {
        res.status(404).json({ message: 'No requests are found' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
