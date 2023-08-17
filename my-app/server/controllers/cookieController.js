const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const user_id = res.locals.user_id;
  res.cookie('user_id', user_id);
  return next();
};

cookieController.clearCookie = (req, res, next) => {
  res.clearCookie('user_id');
  return next();
};

module.exports = cookieController;