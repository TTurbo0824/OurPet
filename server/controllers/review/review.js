const { reviews } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { id, content } = req.body;
      const userReview = await reviews.findAll({
        where: {
          historyId: id
        }
      });

      if (userReview.length > 0) {
        return res.status(409).json({ message: 'Duplicate review' });
      } else {
        await reviews.create({
          historyId: id,
          content: content
        });

        res.status(200).json({ message: 'ok' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
