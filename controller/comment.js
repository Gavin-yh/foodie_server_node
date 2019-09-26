const exe = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')

/**
 * get common 获取评论的内容
 */
let getCommon = (req) => {
    const query = req.query.foodname;
    const sql = `select * from comment where f_name ="${query}" order by id desc;`
    return exe(sql).then((res) => {
        if (res.length) {
            return new successModel(res);
        }else {
            return new errorModel();
        }
    })
}

module.exports = {
    getCommon
}