const { users } = require('../../models');
const { generateAccessToken, generateRefreshToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const { nickname, email, img } = req.body;

    const members = await users.findAll({
      where: {
        kakao: true,
        email: email
      }
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: 'None'
    };

    if (members.length !== 0) {
      const accessToken = generateAccessToken(members[0].dataValues);
      const refreshToken = generateRefreshToken(members[0].dataValues);

      res.cookie('accessToken', accessToken, cookieOptions);
      res.cookie('refreshToken', refreshToken, cookieOptions);
      res.status(200).json({ accessToken, refreshToken, message: 'ok' });
    } else {
      const allMembers = await users.findAll({
        order: [['id', 'DESC']]
      });

      const randomNum = (Math.floor(Math.random() * (9999 - 1000) + 1000));
      const userNickname = `${nickname}#${randomNum}`;

      const payload = {
        id: allMembers[0].dataValues.id + 1,
        kakao: true,
        nickname: userNickname,
        email: email,
        img_url: img,
        salt: null,
        password: null
      };

      await users.create(payload);

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      res.cookie('accessToken', accessToken, cookieOptions);
      res.cookie('refreshToken', refreshToken, cookieOptions);
      res.status(201).json({ accessToken, refreshToken, message: 'ok' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
