const { users } = require('../../models');
const { generateGuestAccessToken, generateRefreshToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const allMembers = await users.findAll({
      order: [['createdAt', 'ASC']]
    });

    const guestID = allMembers[allMembers.length - 1].dataValues.id + 1;
    const guestNickname = `guest#${guestID}`;

    let exTime = process.env.GUEST_TIME;
    exTime = Number(exTime.slice(0, exTime.length - 1));
    exTime *= 60 * 1000;

    setTimeout(() => {
      console.log('🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️');

      users.destroy({
        where: {
          id: guestID,
          nickname: guestNickname,
          createdAt: new Date(Date.now() - exTime)
        }
      });
    }, exTime);

    const payload = {
      id: guestID,
      nickname: guestNickname,
      email: 'guest@walkingdog.com',
      salt: null,
      password: null
    };

    users.create(payload);

    const accessToken = generateGuestAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const cookieOptions = {
      httpOnly: true,
      sameSite: 'None'
    };

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    return res.status(200).json({
      accessToken,
      refreshToken,
      message: 'logged in as a guest user'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
