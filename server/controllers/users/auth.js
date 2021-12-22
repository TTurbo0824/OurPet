require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;

    // 랜덤한 4자리수 생성
    const randomNum = (Math.floor(Math.random() * (9999 - 1000) + 1000));

    // email message options
    const mailOptions = {
      from: process.env.SENDER_ADDRESS,
      to: email,
      subject: 'WalkingDog: 이메일 인증 코드',
      text:
      'WalkingDog에 가입 하신 것을 환영합니다.\n\n아래의 인증 코드를 입력하시면 가입이 정상적으로 완료됩니다.\n\n' +
      randomNum + '\n\n감사합니다.'
    };

    // email transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_ADDRESS,
        pass: process.env.SENDER_PASSWORD
      }
    });

    // console.log(randomNum);
    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email has sent: ${info.response}`);
        res.status(200).json({ data: randomNum, message: 'ok' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
