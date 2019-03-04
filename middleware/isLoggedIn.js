//middleware to verify that a user is authicated
module.exports = function(req, res, next) {
    if (!req.user) {
        req.flash('error', 'You must be logged in to access this that page');
        res.redirect('/auth/login');
    } else {
        next();
    }
};

