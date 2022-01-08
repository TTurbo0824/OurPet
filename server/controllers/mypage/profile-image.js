const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'walkingdog-profile',
      key: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop());
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
  }),

  sendPost: async (req, res) => {
    try {
      const accessTokenData = isAuthorized(req);
      if (!accessTokenData) {
        return res.status(401).send({ message: 'You\'re not logged in.' });
      } else {
        await users.update(
          {
            img_url: req.file.location
          },
          { where: { id: accessTokenData.id } }
        );

        const payload = { url: req.file.location };
        res.status(200).json({ data: payload, message: 'ok' });
      }
    } catch (error) {
      res.status(400).json({ message: 'error' });
    }
  }
};
