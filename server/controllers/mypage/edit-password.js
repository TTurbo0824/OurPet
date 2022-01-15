const { users } = require('../../models');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await users.findOne({
      where: {
        email: email
      }
    });

    if (userInfo) {
      const salt = crypto.randomBytes(64).toString('hex');
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
        .toString('base64');

      await users.update(
        {
          salt: salt,
          password: encryptedPassword
        },
        { where: { email: email } }
      );

      res.status(200).json({ message: 'password updated' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
