const { users, histories, ratings, reviews } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  try {
    const dogwalkerId = req.query.id;

    let allRatings = await ratings.findAll({
      include: [
        {
          model: histories,
          attributes: [],
          where: { dogwalkerId: dogwalkerId }
        }
      ],
      attributes: ['rating']
    });

    const rating = [];
    allRatings = Sequelize.getValues(allRatings);
    allRatings.forEach((el) => rating.push(el.rating));

    let allReviews = await reviews.findAll({
      include: [
        {
          model: histories,
          attributes: ['date', 'dogwalkerId'],
          where: { dogwalkerId: dogwalkerId },
          include: [
            {
              model: users,
              attributes: ['nickname']
            }
          ]
        }
      ],
      attributes: ['content']
    });

    allReviews = Sequelize.getValues(allReviews);

    allReviews = allReviews.map((el) => {
      return {
        date: el.history.date,
        content: el.content,
        nickname: el.history.user.nickname
      };
    });

    res.status(200).json({
      data: [
        {
          ratings: rating,
          reviews: allReviews
        }
      ],
      message: 'ok'
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      message: 'error'
    });
  }
};
