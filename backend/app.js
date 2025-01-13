const dotenv = require('dotenv');
const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// Ortam dosyasını yükleme (dotenv)
dotenv.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`),
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // Her servis isteğinden önce burası çalışır, next denilir ise alttaki kod bloğuna geçer.
  console.log('middleware çalıştı');
  next();
});

// Routing
app.use('/api/v1', require('./routes/v1'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
