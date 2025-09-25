const express = require('express');
const app = express();
const pkg = require('body-parser');
const mongodb = require ('./data/database');
const { json } = pkg;
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const router = require('./routes');
const port = process.env.PORT || 8080;


app.use(json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    next();
});

//#OAuth
app.use(
  session({
    secret: 'aplication-session', //this is better to be a randon generated password, needs to be secure
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => { return done(null, profile); }
  )
)

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.get('/login', passport.authenticate('github'), (req, res) => {});
//#

app.use('/', router);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });