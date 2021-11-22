//Those are all the packages that needed to be downloaded
//You can see that they are dependencies in the package.json file
//Installed third-party packages.

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//Database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
//.on is basically an event listener and if there is an error, we wanna see this message in the cmd line
mongoDB.on('error', console.error.bind(console, 'connection error'));
//.once is to do this only once, and if the connection is working, we want to see the connected message in the cmd line
mongoDB.once('open', ()=> {
  console.log('connected to MongoDB...');
});

//Those are the routes, called routers
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let booksRouter = require('../routes/book');
let ordersRouter = require('../routes/order');


//This is creating an instance of the application called express
//And it stores it in the app variable
let app = express();

// view engine setup
//Views here, the manifest will look for the files that are in the views folder.
//This is the search path, this is where the application will
//look for the views.
//Here we are saying our views are inside the views folder.
app.set('views', path.join(__dirname, '../views'));
//This is to configure our view engine as the ejs
//This is when we did express -e in the command prompt
app.set('view engine', 'ejs');

//This is a series of activation, so we activate our logger.
//...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//This is a static route: anything that is put inside of the public folder
//its automatically part of our path so we dont need to create a path for each
//of them every time
app.use(express.static(path.join(__dirname, '../../public'))); // .. / twice because you have to go up two folders
//__dirname, not _directname **
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//flash - ability to have messages persist between retries
//Initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the user information
//same a encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

//Set up a strategy to get a token and find the user by token ID
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    return done(err, false);
  });
});

passport.use(strategy);

//Here we are activating the / for the indexRouter and the /users for the usersRouter
//These are two routes that are by default activated.
//If you look into the routes folder, you can see there are two files:
//index.js and users.js
//the index file is for the top use while the users is for the bottom use
//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book-list', booksRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error', {title: 'Error'});
});

module.exports = app;
