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
var collectRouter = require('./routes/collect');
var backEnd = require('./routes/backend');


var AIToFace = require('./routes/AIToFace');

var Order = require('./routes/order');

const session = require('express-session');
const formidableMiddleware = require('express-formidable');

const cors = require('cors'); //跨域

const RedisStore = require('connect-redis')(session);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//配置跨域的信息，同时让8002端口和3000端口可以跨域;
let corsConfig = {
  credentials: true,
}
app.use((req, res, next) => {
  // console.log(req.headers.origin);
  if (req.headers.origin === "http://localhost:8002") {
    corsConfig.origin = req.headers.origin;
  }else {
    corsConfig.origin = "http://localhost:3000"
  }
  next();
}) 
// {
//   credentials: true, //是否带凭证cookie / token
//   origin: 'http://localhost:3000', // web前端服务器地址
//   origin: 'http://localhost:8002',
//   // origin: "http://100.64.91.241:3000"
//   // origin: '*' // 这样会出错
// }
app.use(cors(corsConfig))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: './public/images/',
  keepExtensions: true,
  multiples: true, // req.files to be arrays of files
}));

//关于数据签名，缓存验证
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public'), {
//         etag: false
// }));
//返回的数据不存在验证缓存， 前端每次请求都是新的数据
//若不关掉，前端会优先从缓存中去，请求不会是一个新的请求，导致一些问题，如评论：当评论完，刷新页面，评论的内容并没有更新，
// 就是因为，前端通过etag验证，后端验证数据签名没有变，请求的数据会从缓存中取，不会派发一个新的请求。

app.set('etag', false); // turn on

//通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
app.use(express.static('public'))



//创建redis客服端
const redisClient = require('./DB/redis');

//使用session session()执行完会返回一个中间件
app.use(session({
  secret: "DI_*123ikj_", //秘钥, 生成一串东西，cookie的值
  cookie: {
    path: '/', //默认配置
    httpOnly: true, //默认配置
    maxAge: 60 * 60 * 1000 //1小时后失效   传入时间段就可以， expire 需要精确到那个时间点
  },
  store: new RedisStore({
    client: redisClient
  })
}))

app.use('/', homeRouter);
app.use('/', commentRouter);
app.use('/', cityRouter);
app.use('/', imgBarRouter);
app.use('/', loginRouter);
app.use('/api', usersRouter);
app.use('/', Order);
app.use('/', collectRouter);
app.use('/backend', backEnd)


app.use('/', AIToFace);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;