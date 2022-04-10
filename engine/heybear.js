// init app
const path = require('path');
const express = require('express');
require('dotenv').config()

// create express app
const app = express();

// enable middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// init route
app.use('/', require('./route'));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 404 handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;