 const exe = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')
 
/**
 * 获取商家详情页 的图片画廊
 */
 let getImgBar = (param) => {
    const sql = `select * from imgbar where shopname = "${param.shopname}"`;
    return exe(sql).then((res) => {
        if (res && res.length) {
            return new successModel(res);
        }else {
            return new errorModel();
        }
    })
}


module.exports = {
    getImgBar
}