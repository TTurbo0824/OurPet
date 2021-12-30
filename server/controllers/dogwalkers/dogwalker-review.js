const { reviews, histories, users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization);
    const accessTokenData = { id: req.headers.authorization };
    // const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      let allHistories = await histories.findAll({
        include: [{
          model: reviews,
          attributes: ['']
        }],
        where: {
          dogwalkerId: accessTokenData.id
        },
        attributes: ['historyId', 'dogwalkerId']
      });

      allHistories = Sequelize.getValues(allHistories);
      allHistories = allHistories.filter((el) => el.reviews.length > 0);

      if (allHistories.length === 0) {
        res.status(404).json({ message: 'No given reviews are found' });
      } else {
        allHistories = allHistories.map((el) => {
          return {
            historyId: el.historyId,
            dogwalkerId: el.dogwalkerId,
            index: el.reviews[0].historyIndex
          };
        });
        res.status(200).json({ data: allHistories, message: 'ok' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
