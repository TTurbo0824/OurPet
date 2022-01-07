const { histories } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { serviceId } = req.body;

      await histories.destroy({
        where: {
          id: serviceId
        }
      });

      res.status(200).json({ message: 'ok' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
