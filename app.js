const path = require('path');
const express = require('express');
const cors = require('cors');
const env = require('dotenv').config();
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mainRouter = require('./routes/index');
const userRouter = require('./routes/user');
const passport = require('passport');
const strategy = require('./passport/config');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const sessionStore = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'userSessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(session({
    secret: process.env.AUTH_SECRET || 'test',
    cookie: {
        path: '/',
        expires: true,
        maxAge: 60 * 60 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    saveUninitialized: true,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', mainRouter);
app.use('/api/user', userRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`server started at: \n ${HOST}:${PORT}`));