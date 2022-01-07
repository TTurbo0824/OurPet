require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  },
  generateGuestAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: process.env.GUEST_TIME });
  },
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, data }, message: 'ok' });
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];

    try {
      return jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkRefreshToken: (refreshToken) => {
    try {
      return jwt.decode(refreshToken);
    } catch (error) {
      return null;
    }
  }
};
