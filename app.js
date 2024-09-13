const express = require('express');
const env = require('dotenv').config();
const app = express();
const session = require('express-session');
const mainRouter = require('./routes/index');
const passport = require('passport');
const strategy = require('./passport/config');

app.use(session({
    secret: 'test',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));