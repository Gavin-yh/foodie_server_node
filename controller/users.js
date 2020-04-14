const {
    exe,
    escape
} = require('../DB/mysql')
const {
    successModel,
    errorModel
} = require('../model/resModel')


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
        } else {
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
    return exe(sql).then(res => {
        if (res && res.affectedRows === 1) {
            //清除缓存
            req.session.userName = "";
            return new successModel("修改成功");
        } else {
            return new errorModel("修改失败");
        }
    })
}

/**
 * 注册
 */
let userRegister = (userName, userPas, time, power) => {
    userName = escape(userName);
    userPas = escape(userPas);
    const sql = `insert into user(user_name, user_pas, register_time,power)values(${userName},${userPas},"${time}",${power});`;
    return exe(sql).then(res => {
        if (res && res.affectedRows === 1) {
            return new successModel("注册成功");
        } else {
            return new errorModel("注册失败");
        }
    })
}


/**
 * 后台系统查询所有的用户
 */
let selectAllUser = (today) => {
    //有相应日期的话，就回去相应天的用户注册量，没有的话就获取全部的数据
    let sql = `select * from user`;
    if (today) {
       sql = `select * from user where register_time = "${today}"`;
    }

    console.log(today,'wwww')
    return exe(sql).then(result => {
        if (result && result.length > 0) {
            return new successModel({count: result.length});
        } else {
            return new errorModel({count: 0});
        }
    })
}

module.exports = {
    updateUserName,
    updateUserPas,
    userRegister,
    selectAllUser

}