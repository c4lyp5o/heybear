// init app
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
// const RateLimit = require('express-rate-limit');
require('dotenv').config()
// const http = require('http').Server(this.app);
// const io = require('socket.io')(http);

// create express app
const app = express();

// socket.io setting
// io.on('connection', () => {
//     console.log('a user is connected')
//    })

// set up rate limiter: maximum of five requests per minute
// var limiter = RateLimit({
//   windowMs: 1*60*1000, // 1 minute
//   max: 20, // limit each IP to 10 requests per windowMs
// });

// enable middlewares
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// init route
app.use('/', require('./route'));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// database
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to Heybear Database!');
  })
  .catch(err => {
    console.error('Could not Connect to Database!', err);
});

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