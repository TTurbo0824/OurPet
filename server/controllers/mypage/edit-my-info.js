const { isAuthorized } = require('../tokenFunctions');
const { users } = require('../../models');
const crypto = require('crypto');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

// PATCH http://localhost:80/user-info
module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization);
    // const accessTokenData = { id: req.headers.authorization };
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      const { nickname, password } = req.body;
      // console.log(nickname, password);

      let userInfo = await users.findOne({
        where: {
          id: accessTokenData.id
        }
      });

      userInfo = Sequelize.getValues(userInfo);

      if (userInfo) {
        let salt = userInfo.salt;
        let encryptedPassword = userInfo.password;

        if (password !== '') {
          salt = crypto.randomBytes(64).toString('hex');
          encryptedPassword = crypto
            .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
            .toString('base64');
        }

        let changedNickname = nickname;

        const dplctNickname = await users.findOne({
          where: {
            nickname: nickname
          }
        });

        const defaultNicknames = ['pugqueen', 'doglover0522', 'rangrang2'];
        if (dplctNickname || defaultNicknames.includes(nickname)) {
          return res.status(409).json({ message: 'Duplicate nickname' });
        } else if (changedNickname === '' || userInfo.nickname === changedNickname) {
          changedNickname = userInfo.nickname;
        }

        // console.log(changedNickname);
        // console.log(encryptedPassword);

        await users.update(
          {
            nickname: changedNickname,
            salt: salt,
            password: encryptedPassword
          },
          { where: { id: accessTokenData.id } }
        );

        res.status(200).json({
          data: {
            nickname: changedNickname
          },
          message: 'Information updated'
        });
      }
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
