const { requests, users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  try {
    // JUST FOR TESTING PURPOSES
    // console.log(req.headers.authorization.id);
    const accessTokenData = { id: req.headers.authorization };
    // const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: 'You\'re not logged in' });
    } else {
      let allUsers = await users.findAll();
      allUsers = Sequelize.getValues(allUsers);

      let allRequests = await requests.findAll({
        include: [{
          model: users,
          attributes: ['nickname']
        }],
        where: {
          dogwalkerId: accessTokenData.id
        }
      });

      if (allRequests) {
        allRequests = Sequelize.getValues(allRequests);
        allRequests = allRequests.map((request) => {
          return {
            id: request.id,
            userId: request.userId,
            userNickname: request.user.nickname,
            date: request.date,
            type: request.type,
            duration: request.duration,
            time: request.time,
            location: request.location,
            price: request.price
          };
        });
        res.status(200).json({ data: allRequests, message: 'ok' });
      } else {
        res.status(404).json({ message: 'No requests are found' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
