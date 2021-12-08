const { reviews } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization);
    // const accessTokenData = { id: req.headers.authorization };
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { id } = req.body;

      const userReview = await reviews.findAll({
        where: {
          id: id
        }
      });

      if (userReview.length === 0) {
        return res.status(404).json({ message: 'Review not found' });
      } else {
        await reviews.destroy({
          where: {
            id: id
          }
        });

        return res.status(200).json({ message: 'ok' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
