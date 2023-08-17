const sessionController = {};

// middleware to create and set a session
sessionController.createSession = (req, res, next) => {
    req.session.user_id = res.locals.user_id;
    return next();
};

module.exports = sessionController;