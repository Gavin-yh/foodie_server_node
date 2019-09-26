var express = require('express');
var router = express.Router();

let {
  updateUserName,
  updateUserPas
} = require('../controller/users')
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
  updateUserPas(req, req.session.userName, newUserPas).then(result => {
    //清空缓存 理由同上
    // req.session.userName = "";
    res.json(result)
  })
})


module.exports = router;
