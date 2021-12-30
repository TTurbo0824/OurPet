const crypto = require('crypto');
const { users } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    // 회원가입 양식을 다 채우지 않은 경우
    if (!nickname || !email || !password) {
      return res.status(417).json({ message: 'please fill in all the required fields' });
    }

    // 이메일과 닉네임 모두 중복인 경우
    const dplctInfo = await users.findAll({
      where: {
        email: email,
        nickname: nickname
      }
    });

    // 이메일이 중복인 경우
    const dplctEmail = await users.findAll({
      where: {
        email: email
      }
    });

    // 닉네임이 중복인 경우
    const dplctNickname = await users.findAll({
      where: {
        nickname: nickname
      }
    });

    if (dplctInfo.length !== 0) {
      return res.status(409).json({ message: 'conflict: email & nickname' });
    } else if (dplctEmail.length !== 0) {
      return res.status(409).json({ message: 'conflict: email' });
    } else if (dplctNickname.length !== 0) {
      return res.status(409).json({ message: 'conflict: nickname' });
    } else {
      const salt = crypto.randomBytes(64).toString('hex');
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
        .toString('base64');

      await users.create({
        kakao: false,
        nickname: nickname,
        email: email,
        img_url: null,
        salt: salt,
        password: encryptedPassword
      });

      return res.status(201).json({ message: 'thank you for signing up!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
