const { ratings } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { id, rating } = req.body;
      const userReview = await ratings.findAll({
        where: {
          historyId: id
        }
      });

      if (userReview.length === 0) {
        return res.status(404).json({ message: 'Rating not found' });
      } else {
        await ratings.update({
          rating: rating
        },
        {
          where: { historyId: id }
        });

        res.status(200).json({ message: 'ok' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
