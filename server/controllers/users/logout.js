const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    }
    res.setHeader('authorization', '');

    res.status(205).json({ message: 'logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
