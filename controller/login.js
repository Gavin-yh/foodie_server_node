const exe = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')


let userLogin = (userName, userPas) => {
    const sql = `select * from user where user_name = '${userName}' and user_pas='${userPas}';`
    return exe(sql).then( result => {
            if (result && result.length > 0) {
                return new successModel("登入成功");
            }else{
                return new errorModel("登入失败");
            }
        })
}


module.exports = {
    userLogin
}