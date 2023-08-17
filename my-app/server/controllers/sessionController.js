const sessionController = {};

sessionController.createSession = (req, res, next) => {
    console.log(res.locals.user_id);
    req.session.user_id = res.locals.user_id;
    console.log(req.session);
    return next();
};

module.exports = sessionController;