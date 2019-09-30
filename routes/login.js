const express = require('express');
const router = express.Router();


let {
    userLogin
} = require('../controller/login')
/**
 * 用户登入的路由
 */
router.post('/api/login', (req, res, next) => {
    const { userName, userPas } = req.fields;
    userLogin( userName, userPas ).then( result => {

        //设置session
        req.session.userName = userName;
        req.session.userPas = userPas;

        res.setHeader("Cache-Control","max-age=10000");
        result.userName = userName;
        res.json({
           result
        })
    })
})

/**
 * 判断是否有登入了
 */

 router.get('/api/loginCheck', (req, res, next) => {
    if (req.session.userName) {
        res.json({
            name: req.session.userName,
            msg: "已经登入",
            status: 0
        })
    }else {
        res.json({
            msg: "未登入",
            status: -1
        })
    }
 })

 

 /**
  * 退出登入
  */
 router.get('/api/loginOut', (req, res, next) => {
     req.session.userName = "";
     res.json({
         msg: "退出成功",
         status: 0 
     })
 })
module.exports = router;