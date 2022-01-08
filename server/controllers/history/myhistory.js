const { histories, ratings, reviews, dogwalkers } = require('../../models');
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

      let historyList = await histories.findAll({
        where: {
          userId: accessTokenData.id
        }
      });

      if (historyList) {
        historyList = Sequelize.getValues(historyList);
        historyList.map((history) => {
          history.name = allDogwalkers[history.dogwalkerId - 1].name;
          history.img = allDogwalkers[history.dogwalkerId - 1].profile;
          return history;
        });

        let allRatings = await histories.findAll({
          include: [{
            model: ratings,
            attributes: ['id', 'rating']
          }],
          where: {
            userId: accessTokenData.id
          },
          attributes: ['historyId', 'dogwalkerId']
        });

        allRatings = Sequelize.getValues(allRatings);
        allRatings = allRatings.filter((el) => el.ratings.length > 0);

        allRatings = allRatings.map((el) => {
          return {
            id: el.id,
            dogwalkerId: el.dogwalkerId,
            rating: el.ratings[0].rating
          };
        });

        let allReviews = await histories.findAll({
          include: [{
            model: reviews,
            attributes: ['id', 'content']
          }],
          where: {
            userId: accessTokenData.id
          },
          attributes: ['historyId', 'dogwalkerId']
        });

        allReviews = Sequelize.getValues(allReviews);
        allReviews = allReviews.filter((el) => el.reviews.length > 0);
        allReviews = allReviews.map((el) => {
          return {
            id: el.reviews[0].id,
            historyId: el.historyId,
            dogwalkerId: el.dogwalkerId,
            content: el.reviews[0].content
          };
        });
        res.status(200).json({ data: { allHistories: historyList, ratings: allRatings, reviews: allReviews }, message: 'ok' });
      } else {
        res.status(404).json({ message: 'No histories are found' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
