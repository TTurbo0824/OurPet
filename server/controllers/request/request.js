const { requests } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    // console.log(req.headers.authorization);
    // JUST FOR TESTING PURPOSES
    // const accessTokenData = { id: req.headers.authorization };
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { dogwalkerId, type, location, date, duration, price, time } = req.body;

      // console.log(dogwalkerId, type, location, date, duration, price, time);
      const isNotNewRequest = await requests.findOne({
        where: {
          userId: accessTokenData.id,
          dogwalkerId: dogwalkerId,
          date: date,
          time: time
        }
      });

      if (isNotNewRequest) {
        return res.status(409).json({ message: 'You cannot make the duplicate request' });
      }

      const allRequests = await requests.findAll({
        where: {
          userId: accessTokenData.id
        }
      });

      const now = new Date();
      const target = moment(now);
      let requestTime = 0;

      if (time === '오전 12시') {
        requestTime = 0;
      } else if (time === '오후 12시') {
        requestTime = 12;
      } else if (time[1] === '후') {
        requestTime = Number(time.split(' ')[1].slice(0, -1)) + 12;
      } else {
        requestTime = Number(time.split(' ')[1].slice(0, -1));
      }

      const dateTime = `${date} ${requestTime}`;
      const requestDate = moment(dateTime, 'YYYY.MM.DD H');
      if (requestDate.from(target).includes('ago')) {
        return res.status(403).json({ message: 'Past date/time' });
      }

      const temp = await requests.findAll({
        order: [['createdAt', 'DESC']]
      });

      let tempId = 1;

      if (temp.length !== 0) {
        tempId = temp[0].dataValues.id + 1
      }

      // console.log(tempId);

      let payload = {
        id: tempId,
        requestId: allRequests.length + 1,
        userId: accessTokenData.id,
        dogwalkerId: dogwalkerId,
        type: type,
        location: location,
        date: date,
        duration: duration,
        price: price,
        time: time,
        status: 'pending'
      }

      requests.create(payload);

      return res.status(200).json({ message: 'ok', data: { id: tempId } });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
