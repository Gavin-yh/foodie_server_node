const exe = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')


/**
 * update userName
 */
let updateUserName = (req, userName, newName) => {
    const sql = `update user set user_name="${newName}" where user_name="${userName}"`;
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
    const sql = `update user set user_pas="${newPas}" where user_name="${userName}"`;
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


module.exports = {
    updateUserName,
    updateUserPas
}