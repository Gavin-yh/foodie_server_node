const {exe, escape } = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')
const xss = require('xss');
/**
 * get common 获取评论的内容
 */
let getCommon = (req) => {
    const query = escape(req.query.foodname);
    const sql = `select * from comment where f_name =${query} order by id desc;`
    return exe(sql).then((res) => {
        if (res && res.length) {
            return new successModel(res);
        }else {
            return new errorModel([]);
        }
    })
}
/**
 * 
 * @param {*} req 
 * 增加订单评论
 */
let addComment = (req) => {
    let {
        userName,
        photo,
        time,
        foodName,
        content,
        good,
        star_num,
    } = req.fields
    content = xss(content);
    const sql = `insert into comment(use_name, photo, time, content, f_name, good, star_num)
                values(${escape(userName)},${escape(photo)},${escape(time)}, 
                ${escape(content)}, ${escape(foodName)}, ${escape(good)},${star_num})`
    return exe(sql).then( res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("评论成功");
        }else{
            return new errorModel("评论失败");
        }
    })
}


module.exports = {
    getCommon,
    addComment
}