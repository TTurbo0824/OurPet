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
          attributes: ['id', 'date', 'dogwalkerId'],
          where: { dogwalkerId: dogwalkerId },
          include: [
            {
              model: users,
              attributes: ['nickname', 'img_url']
            }
          ]
        }
      ],
      attributes: ['content']
    });

    allReviews = Sequelize.getValues(allReviews);

    allReviews = allReviews.map((el) => {
      return {
        id: el.history.id,
        date: el.history.date,
        content: el.content,
        nickname: el.history.user.nickname,
        profile_url: el.history.user.img_url
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
