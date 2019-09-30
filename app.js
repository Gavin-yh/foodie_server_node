var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var commentRouter = require('./routes/comment');
var cityRouter = require('./routes/city');
var usersRouter = require('./routes/users');
var imgBarRouter = require('./routes/imgBar');
var loginRouter = require('./routes/login');

var Order = require('./routes/order');

const session = require('express-session');
const formidableMiddleware = require('express-formidable');

const cors = require('cors');

const RedisStore = require('connect-redis')(session);


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors({
            credentials: true, //是否带凭证cookie / token
            origin: 'http://localhost:3000', // web前端服务器地址
            // origin: "http://100.64.107.215:3000"
            // origin: '*' // 这样会出错
        })
      )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(formidableMiddleware());
// app.use(express.static(path.join(__dirname, 'public')));

//创建redis客服端
const redisClient = require('./DB/redis');

//使用session session()执行完会返回一个中间件
app.use(session({
  secret: "DI_*123ikj_", //秘钥, 生成一串东西，cookie的值
  cookie: {
    path: '/',//默认配置
    httpOnly: true,//默认配置
    maxAge: 60 * 60 * 1000 //1小时后失效   传入时间段就可以， expire 需要精确到那个时间点
  },
  store:  new RedisStore({client: redisClient})
}))


app.use('/', homeRouter);
app.use('/',commentRouter);
app.use('/',cityRouter);
app.use('/',imgBarRouter);
app.use('/',loginRouter);
app.use('/api', usersRouter);
app.use('/',Order);

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
