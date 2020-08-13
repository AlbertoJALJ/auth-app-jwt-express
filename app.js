var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors')
var Role = require('./models/role')
var app = express();
app.set('port', process.env.PORT || 69);

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
          new Role({
              name: "User"
          }).save(err => {
              if (err) {
                  console.log("error", err);
              }

              console.log("added 'user' to roles collection");
          });

          new Role({
              name: "Client"
          }).save(err => {
              if (err) {
                  console.log("error", err);
              }

              console.log("added 'moderator' to roles collection");
          });

          new Role({
              name: "Admin"
          }).save(err => {
              if (err) {
                  console.log("error", err);
              }

              console.log("added 'admin' to roles collection");
          });
      }
  });
}
module.exports = app;
