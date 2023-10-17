var createError = require('http-errors');
const express = require('express');
require('dotenv').config()
const path = require('path');
var cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require('./routes'));
app.use("/", require('./routes/student.routes'));
app.use("/", require('./routes/class.routes'));
app.use("/", require('./routes/department.routes'));
app.use('/', require('./routes/users.routes'));
app.use('/', require('./routes/course.routes'));
//HAHA
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/home', (req, res, next) => {
  try {
    const token = req.cookies.token
    var ketqua = jwt.verify(token, 'loy') 
    if (ketqua) {
      next()
    }
  } catch (error) {
    return res.redirect('/login')
  }
}, (req, res, next) => {
  return res.render('./index')
})

//HAHA




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  /* ket noi voi database */
  mongoose.connect('mongodb://127.0.0.1:27017/student_manager', { useNewUrlParser: true });
  var db = mongoose.connection;
  if(!db){
    console.log("database khong ket noi duoc");
  }else{
    console.log("da ket noi voi database");
  }

  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


app.listen(process.env.PORT,function(){
    console.log("server is running on port 3000");
  });

module.exports = app;

