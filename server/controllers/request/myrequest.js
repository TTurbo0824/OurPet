const { requests, dogwalkers } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  try {
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

      if (allRequests) {
        allRequests = Sequelize.getValues(allRequests);
        allRequests = allRequests.map((request) => {
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
