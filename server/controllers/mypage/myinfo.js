const { isAuthorized } = require('../tokenFunctions');
const { users } = require('../../models');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).send({ message: 'You\'re not logged in.' });
    } else {
      const userInfo = await users.findOne({
        where: {
          id: accessTokenData.id
        }
      });

      res.status(200).json({
        data: {
          nickname: userInfo.nickname,
          email: userInfo.email,
          img_url: userInfo.img_url
        },
        message: 'ok'
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
