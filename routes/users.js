var express = require('express');
var router = express.Router();

let {
  updateUserName,
  updateUserPas,
  userRegister,
  selectAllUser
} = require('../controller/users')

//注册用户名验证，不能注册相同的用户名。
let {
   nameUniquCheck
} = require('../middleWare/nameCheck')

//md5加密函数
let {
  cryptoFun
} = require('../md5')

/**
 * 改userName
 */
router.post('/update/userName', (req, res, next) => {
  const {userName, newName} = req.fields;
  updateUserName(req, userName, newName).then( result => {
    //清空session缓存 不应该在这里清除，应该在成功的时候清除，应该在updateUserName里面
    // req.session.userName = "";
    res.json(result);
  })
});

/**
 * 更新密码
 */
router.post('/update/userPas', (req, res, next) => {
  const newUserPas = req.fields.newPas;
  updateUserPas(req, req.session.userName, cryptoFun(newUserPas)).then(result => {
    //清空缓存 理由同上
    // req.session.userName = "";
    res.json(result)
  })
})

/**
 * 注册
 * nameUniquCheck   中间件处理，用户名唯一性；
 */

router.post('/user/register', nameUniquCheck, (req, res, next) => {
  const { userName, userPas, time, power } = req.fields;
  userRegister(userName, cryptoFun(userPas), time, power).then( result => {
    res.json(result)
  })
})


//后台系统查询所用的用户
router.get('/user/allUser', (req, res, next) => {
  let { today } = req.query
  selectAllUser(today).then( (result) => {
    res.json(result);
  })
})

module.exports = router;
