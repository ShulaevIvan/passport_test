const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');

mongoose.connect(`${process.env.DATABASE_URL}`).then((data) => {
    console.log('connected to db - ok');
})
.catch((err) => {
    console.log(err);
    console.log('connected to db - err');
})

const verifyPassword = (user, password) => {
    return user.password === password;
};


passport.use(new LocalStrategy(
    async (username, password, done) => {
        await User.findOne({username: username})
        .then((user) => {
            try {
                if (!user) { return done(null, false); }
                if (!verifyPassword(user, password)) { return done(null, false); }
                return done(null, user);
            }
            catch(err) {
                return done(err);
            }
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user); 
});

passport.deserializeUser(async (user, done) => {
    console.log(user._id)
    try {
        await User.findOne({id: user._id})
        .then((user) => {
            done(false, user);
        });
    }
    catch(err) {
        done(err, user);
    }
    
});