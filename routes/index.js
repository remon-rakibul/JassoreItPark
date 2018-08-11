let express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    User     = require('../models/user');

//LANDING ROUTE
router.get('/', (req, res) => {
    res.render('landing');
});
// AUTH ROUTES
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome to Jashore It Park ' + user.username);
            res.redirect('/companies');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/companies',
    failureRedirect: '/login'
}), (req, res) => {});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect('/companies');
});

module.exports = router;