const { histories, dogwalkers } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization);
    // const accessTokenData = { id: req.headers.authorization };
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      let allDogwalkers = await dogwalkers.findAll();
      allDogwalkers = Sequelize.getValues(allDogwalkers);

      let allHistories = await histories.findAll({
        where: {
          userId: accessTokenData.id
        }
      });

      if (allHistories) {
        allHistories = Sequelize.getValues(allHistories);
        allHistories.map((history) => {
          history.name = allDogwalkers[history.dogwalkerId - 1].name;
          history.img = allDogwalkers[history.dogwalkerId - 1].profile;
          return history;
        });
        // console.log(allHistories);
        res.status(200).json({ data: allHistories, message: 'ok' });
      } else {
        res.status(404).json({ message: 'No histories are found' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
