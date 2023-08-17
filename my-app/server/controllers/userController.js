const models = require('../models/models');

const userController = {};

// middleware to create a user on signup
userController.createUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const user = await models.User.create({username, password})
      res.locals.user = user;
      res.locals.user_id = user._id;
      return next();
  } catch (error) {
      return next({
        log: error,
        status: 400,
        message: {error: 'Error occurred in userController.createUser middleware'}
      })
  }
};

// middleware to verify user on login
userController.verifyUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const user = await models.User.findOne({username: username, password: password})
    if (user) {
      res.locals.user_id = user._id;
      return next();
    } else res.redirect('/signup');
  } catch (error) {
      return next({
        log: error,
        status: 400,
        message: {error: 'Error occurred in userController.verifyUser middleware'}
      })
    }
};

module.exports = userController;