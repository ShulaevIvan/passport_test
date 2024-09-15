const passport = require('passport');
const router = require('express').Router();
const User = require('../models/userSchema');

router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.get('/logout', async (req, res, next) => {
    try {
        req.logout((user, err) => {
            if(err) next(err);
            res.redirect('/');
        });
    }
    catch(err) {
        res.status(500);
        console.log('err (GET) logout');
        console.log(err);
    }
});

router.get('/singup', async (req, res) => {
    try {
        res.status(200);
        res.render('singup');
    }
    catch(err) {
        console.log('err (GET) singup')
        res.status(500);
    }
});

router.get('/me', async (req, res) => {
    try {
        if (req.user) {
            res.render('userProfile', {user: req.user});
        }
        res.status(200);
        res.redirect('/api/user/login');
    }
    catch(err) {
        res.status(500);
        console.log('err GET me');
        console.log(err);
    }
});

router.post('/login',  passport.authenticate('local', 
    { 
        failureRedirect: '/api/user/login',
        successRedirect: '/api/user/me',
    }),
    async (req, res) => {
        try {
            res.status(301);
            res.redirect('/');
        }
        catch(err) {
            res.status(500);
            console.log('login err');
            console.log(err);
        }
    }
);

router.post('/singup', async (req, res) => {
    try {
        const { username, password } = req.body;
        await User.create({username: username, password: password})
        .then((data) => {
            // res.redirect('/api/user/login');
            passport.authenticate("local")(req,res, function() {
                res.status(201);
                res.status(301); 
                res.redirect("/api/user/me"); 
            });
        })
        .catch((err) => {
            res.status(500);
            console.log('singup err');
            res.redirect('/api/user/login');
        })
    }
    catch(err) {
        res.json({message: 'status err'});
    }
});

module.exports = router;