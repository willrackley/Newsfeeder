
// Passport function to check is user allowed to see content
// If user is not allowed to see content, redirect to login page
module.exports = {
    // Function to check is user access status and redirect
    isLogged: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/app/main')
        } else {
            req.flash('error_msg', 'No access to this page!');
            res.redirect('/app/login');
        }
    }
};