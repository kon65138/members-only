require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');

const pool = require('./db/pool');
const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signUpRouter');
const loginRouter = require('./routes/loginRouter');
const homepageRouter = require('./routes/homepageRouter');
const createMessageRouter = require('./routes/createMessageRouter');
const logoutRouter = require('./routes/logoutRouter');
const adminLogInRouter = require('./routes/adminLoginRouter');
const joinClubRouter = require('./routes/joinClubRouter');
const deleteRouter = require('./routes/deleteRouter');
require('./config/passport');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // the browser holds this stream open; when the server restarts the stream
  // drops, and the browser reloads itself (see views/partials/dev-reload.ejs)
  app.get('/dev/reload', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });
    res.flushHeaders();
  });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// makes `currentUser` and `dev` available in every EJS template
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.dev = process.env.NODE_ENV !== 'production';
  next();
});

app.use('/', indexRouter);
app.use('/signUp', signUpRouter);
app.use('/login', loginRouter);
app.use('/homepage', homepageRouter);
app.use('/createMessage', createMessageRouter);
app.use('/logout', logoutRouter);
app.use('/adminLogin', adminLogInRouter);
app.use('/joinClub', joinClubRouter);
app.use('/delete', deleteRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
