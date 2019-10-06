const {exe, escape } = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')



const nameUniquCheck = (req, res, next) => {
    const userName = escape(req.fields.userName);
    const sql = `select * from user where user_name = ${userName}`;
    console.log(sql)
     exe(sql).then( result => {
        if (result && result.length > 0) {
            res.json(new errorModel("该用户名以存在"))
        }else{
            next();
        }
    })
}

module.exports = {
    nameUniquCheck
}