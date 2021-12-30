const { histories, ratings } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const dummyRating = require('./dummyRating.js');

module.exports = async (req, res) => {
  try {
    // console.log(dummyRating);
    let allRatings = await histories.findAll({
      include: [
        {
          model: ratings,
          attributes: ['rating']
        }
      ],
      attributes: ['dogwalkerId']
    });

    allRatings = Sequelize.getValues(allRatings);
    allRatings = allRatings.filter((el) => el.ratings.length > 0);

    allRatings = allRatings.map((el) => {
      return {
        dogwalkerId: el.dogwalkerId,
        rating: el.ratings[0].rating
      };
    });

    const rating = {};

    allRatings.forEach((el) => {
      if (!rating[el.dogwalkerId]) rating[el.dogwalkerId] = [el.rating];
      else rating[el.dogwalkerId].push(el.rating);
    });

    const ratingData = [];

    dummyRating.forEach((el, idx) => {
      ratingData.push(Object.assign({}, el));
      if (rating[el.id]) {
        ratingData[idx].rating = [];
        const temp = [...el.rating];
        ratingData[idx].rating = temp.concat(...rating[el.id]);
      }
    });

    res.status(200).json({
      data: {
        // ratings: rating,
        allRating: ratingData
      },
      message: 'ok'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
