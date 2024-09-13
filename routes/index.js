const passport = require('passport');
const router = require('express').Router();
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    return res.json({message: 'mainpage'});
});

router.get('/login', (req, res) => {
    return res.json({message: 'loginpage'});
});

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
});

router.post('/singup', async (req, res) => {
    try {
        const { username, password } = req.body;
        await User.create({username: username, password: password})
        .then((data) => {
            res.json({message: data})
        });
    }
    catch(err) {
        res.json({message: 'status err'});
    }
});

module.exports = router;