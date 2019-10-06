const {exe, escape } = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')


/**
 * update userName
 */
let updateUserName = (req, userName, newName) => {
    newName = escape(newName);
    const sql = `update user set user_name=${newName} where user_name="${userName}"`;
    return exe(sql).then((res) => {
        if (res && res.affectedRows === 1) {
            //清除缓存
            req.session.userName = "";
            return new successModel("修改成功");
        }else {
            return new errorModel("修改失败");
        }
    })
}

/**
 * update userPassword
 */
let updateUserPas = (req, userName, newPas) => {
    newPas = escape(newPas);
    const sql = `update user set user_pas=${newPas} where user_name="${userName}"`;
    console.log(sql)
    return exe(sql).then( res => {
        if (res && res.affectedRows === 1) {
            //清除缓存
            req.session.userName = "";
            return new successModel("修改成功");
        }else{
            return new errorModel("修改失败");
        }
    })
}

/**
 * 注册
 */
let userRegister = (userName, userPas) => {
    userName = escape(userName);
    userPas = escape(userPas);
    const sql = `insert into user(user_name, user_pas)values(${userName},${userPas});`;
    return exe(sql).then( res => {
        if (res && res.affectedRows === 1) {
            return new successModel("注册成功");
        }else{
            return new errorModel("注册失败");
        }
    })
}
module.exports = {
    updateUserName,
    updateUserPas,
    userRegister

}