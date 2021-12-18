const { histories, ratings, reviews, requests, dogwalkers } = require('../../models');
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

      let allRequests = await requests.findAll({
        where: {
          userId: accessTokenData.id
        }
      });
      // console.log(allRequests);

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
            price: request.price
          };
        });
      }

      let historyList = await histories.findAll({
        where: {
          userId: accessTokenData.id
        }
      });

      if (historyList) {
        historyList = Sequelize.getValues(historyList);
        historyList = historyList.map((history) => {
          return {
            id: history.id,
            dogwalkerId: history.dogwalkerId,
            name: allDogwalkers[history.dogwalkerId - 1].name,
            img: allDogwalkers[history.dogwalkerId - 1].profile,
            date: history.date,
            type: history.type,
            location: history.location,
            time: history.time,
            duration: history.duration,
            price: history.price
          };
        });

        let allRatings = await histories.findAll({
          include: [{
            model: ratings,
            attributes: ['rating']
          }],
          where: {
            userId: accessTokenData.id
          },
          attributes: ['id', 'historyId', 'dogwalkerId']
        });

        allRatings = Sequelize.getValues(allRatings);
        allRatings = allRatings.filter((el) => el.ratings.length > 0);

        allRatings = allRatings.map((el) => {
          return {
            id: el.id,
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
          attributes: ['id', 'historyId', 'dogwalkerId']
        });

        allReviews = Sequelize.getValues(allReviews);
        allReviews = allReviews.filter((el) => el.reviews.length > 0);
        allReviews = allReviews.map((el) => {
          return {
            id: el.id,
            content: el.reviews[0].content
          };
        });
        res.status(200).json({ data: { allHistories: historyList, allRequests: allRequests, ratings: allRatings, reviews: allReviews }, message: 'ok' });
      } else {
        res.status(404).json({ message: 'No histories are found' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
