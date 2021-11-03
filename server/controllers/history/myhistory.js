const { histories } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization);
    const accessTokenData = { id: req.headers.authorization };
    // const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const allHistories = await histories.findAll({
        where: {
          userId: accessTokenData.id
        }
      });
      // console.log(allHistories);
      res.status(200).json({ data: allHistories, message: 'ok' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
