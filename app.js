var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(cookieParser());
//para servir ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Variables globales de template
app.locals.titulo = 'BBQ API';

/**
 * Conectamos a la base de datos
 * y registramos los modelos
 */
require('./lib/connectMongoose');
//require('./models/Recetas');



/**
 * Rutas de mi aplicación Web
 */
app.use('/',      require('./routes/index'));
//app.use('/users', require('./routes/users'));

/** 
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
