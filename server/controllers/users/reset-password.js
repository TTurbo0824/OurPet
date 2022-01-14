const { users } = require('../../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    const isRegistered = await users.findOne({
      where: {
        email: email
      }
    });

    if (!isRegistered) {
      return res.status(404).json({ message: 'Invalid user' });
    }

    const randomNum = (Math.floor(Math.random() * (9999 - 1000) + 1000));

    // email message options
    const mailOptions = {
      from: process.env.SENDER_ADDRESS,
      to: email,
      subject: 'WalkingDog: 비밀번호 재설정 인증 코드',
      text:
      '인증 칸에 아래의 숫자를 입력해주세요.\n\n' +
      randomNum
    };

    // email transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_ADDRESS,
        pass: process.env.SENDER_PASSWORD
      }
    });

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).json({ message: 'error' });
      } else {
        console.log(`Email has sent: ${info.response}`);
        res.status(200).json({ data: randomNum, message: 'ok' });
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
