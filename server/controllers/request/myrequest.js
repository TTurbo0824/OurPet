const { requests, dogwalkers } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

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
        allRequests = allRequests.map((history) => {
          const requestDate = new Date(history.date);
          const now = Date.now();
          if (now - requestDate > 0) { history.status = 'expired'; }
          return {
            id: history.id,
            dogwalkerId: history.dogwalkerId,
            name: allDogwalkers[history.dogwalkerId - 1].name,
            img: allDogwalkers[history.dogwalkerId - 1].profile,
            date: history.date,
            type: history.type,
            duration: history.duration,
            time: history.time,
            location: history.location,
            price: history.price,
            status: history.status
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
