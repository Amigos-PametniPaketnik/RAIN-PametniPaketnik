var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://nikotic:nikotic@projekt-rain.ycodz.mongodb.net/test";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var parcelLockersRouter = require('./routes/parcelLockerRoutes');
var accessPermissionsRouter = require('./routes/accessPermissionRoutes');
var unlocksRouter = require('./routes/unlockedRoutes');
var eNotifyRouter = require('./routes/eNotifyRoutes');
// Api Routers
var indexApiRouter = require('./routes/indexApi');
var usersApiRouter = require('./routes/userRoutesApi');
var parcelLockerApiRouter = require('./routes/parcelLockerRoutesApi');
var accessPermissionsApiRouter = require('./routes/accessPremissionRoutesApi');
var unlocksApiRouter = require('./routes/unlockedApiRoutes');
var eNotifyApiRouter = require('./routes/eNotifyApiRoutes');

var app = express();

var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    return callback(null, true);
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret: 'amigos',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: mongoDB})
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/parcel-lockers', parcelLockersRouter);
app.use('/access-permissions', accessPermissionsRouter);
app.use('/unlocks', unlocksRouter);
app.use('/notifications', eNotifyRouter);
// Router for third useable Restful API
app.use('/api/', indexRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/parcel-lockers', parcelLockerApiRouter);
app.use('/api/access-premissions', accessPermissionsApiRouter);
app.use('/api/unlocks', unlocksApiRouter);
app.use('/api/notifications', eNotifyApiRouter);



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
  res.render('error');
});

module.exports = app;
