const {exe, escape } = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')


/**
 * get city 获取城市的内容
 */
let getCity = (req) => {
    const sql = `select * from city`
    return exe(sql).then((res) => {
        if (res && res.length) {
            return new successModel(res);
        }else {
            return new errorModel();
        }
    })
}

module.exports = {
    getCity
}