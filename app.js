var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var config = require('./conf/config');
//var https = require('https');
//var fs = require('fs');
var basic = auth.basic({
  realm: "Private area",
  file: __dirname + "/htpasswd"
});

//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// use http-auth.basic
app.use(auth.connect(basic));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
  //res.render('error', {
  //  message: err.message,
  //  error: {}
  //});
});

//https.createServer(app).listen(config.port, function(){
//  var log_info = 'admin-frontend started, listening at port:'+config.port;
//  console.log(log_info.green);
//});

app.listen(config.port, function(){
  var log_info = 'admin-frontend started, listening at port:'+config.port;
  console.log(log_info.green);
});

module.exports = app;
