const models = require('../models/models');

const userController = {};

userController.createUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const user = await models.User.create({username, password})
    .then((data) => {
      res.locals.user = data;
      res.locals.user_id = data._id;
    });
    return next();
  } catch (error) {
    return next(error);
  };
};

userController.verifyUser = async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const user = await models.User.findOne({username: username, password: password})
    if (user) {
      res.locals.user_id = user._id;
      return next();
    } else res.redirect('/signup');
  } catch (error) {
    return next(error);
  };
};

module.exports = userController;