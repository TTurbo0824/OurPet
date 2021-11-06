const { requests } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // console.log(req.headers.authorization);
    // JUST FOR TESTING PURPOSES
    const accessTokenData = { id: req.headers.authorization };
    // const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { dogwalkerId, type, location, date, duration, price } = req.body;

      const isNotNewRequest = await requests.findOne({
        where: {
          userId: accessTokenData.id,
          dogwalkerId: dogwalkerId,
          date: date
        }
      });

      if (isNotNewRequest) {
        return res.status(409).json({ message: 'You cannot make the duplicate request' });
      }

      await requests.create({
        userId: accessTokenData.id,
        dogwalkerId: dogwalkerId,
        type: type,
        location: location,
        date: date,
        duration: duration,
        price: price,
        status: 'pending'
      });

      return res.status(200).json({ message: 'ok' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
