const { users } = require('../../models');

module.exports = (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error' });
  }
};
