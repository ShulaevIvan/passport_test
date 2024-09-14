const passport = require('passport');
const router = require('express').Router();
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    console.log(req.isAuthenticated())
    res.render('index', {user: req.user});
});

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.post('/login',  passport.authenticate('local', 
    { 
        failureRedirect: '/login',
        successRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((user, err) => {
        if(err) next(err);
        res.redirect('/');
    });
});

router.get('/singup', (req, res) => {
    res.render('singup');
});

router.post('/singup', async (req, res) => {
    try {
        const { username, password } = req.body;
        await User.create({username: username, password: password})
        .then((data) => {
            res.redirect('/login');
        });
    }
    catch(err) {
        res.json({message: 'status err'});
    }
});

module.exports = router;