const {exe, escape } = require('../DB/mysql')
let { successModel, errorModel } = require('../model/resModel')


/**
 * 创建订单数据, 状态为未支付;
 */
let pushOrder = (req) => {
    let {
        shopName,
        foodName,
        price,
        totlePrice,
        imgUrl,
        userName,
        statu,
        statu_msg,
        orderNumber,
        time,
        location
    } = req.fields
    price = Number(price);
    totlePrice = Number(totlePrice);
    const sql = `insert into orderTable(user_name, food_name, price, totle_price, title_img, statu, statu_msg, shop_name, order_number, order_time, location)
                values("${userName}","${foodName}",${price}, ${totlePrice}, "${imgUrl}", "${statu}","${statu_msg}", "${shopName}", "${orderNumber}", "${time}", "${location}")`
    return exe(sql).then( res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("订单创建成功");
        }else{
            return new errorModel("订单创建失败");
        }
    })
}

/**
 * 
 * 改变订单的状态
 * @param {*} req 
 */
let changeOrderStatu = (req) => {
    let {
        statu,
        statu_msg,
        orderNumber
    } = req.fields
    const sql = `update orderTable set statu = "${statu}",statu_msg="${statu_msg}" where order_number="${orderNumber}";`
    return exe(sql).then( res => {
            if (res && res.affectedRows >= 1) {
                return new successModel("订单更新成功");
            }else{
                return new errorModel("订单更新失败");
            }
        })
}

/**
 * 获取所有的订单
 */
let getAllOrder = (userName) => {
    const sql = `select * from orderTable where user_name="${userName}" order by id desc `
    return exe(sql).then( res => {
        if (res && res.length > 0){
            return new successModel(res);
        }else{
            return new errorModel("订单查询失败!");
        }
    })
}

/**
 * 按照类型获取订单  用于 待使用、待付款、待评论
 */
let getClassOrder = (classfy, userName) => {
    const sql = `select * from orderTable where statu ="${classfy}" and user_name="${userName}" order by id desc`
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        }else{
            return new errorModel("无订单");
        }
    })
}

/**
 * 按照订单编号来获取订单  用于付款成功的  orderDetail
 */
let getNumberOrder = (param) => {
    const sql = `select * from orderTable where order_number ="${param}"`
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        }else{
            return new errorModel("无订单");
        }
    })
}


/**
 * 取消未付款的订单
 * 根据订单编号来删除订单
 */
let deleteOrderForNumber = (number) => {
    const sql = `delete from orderTable where order_number = "${number}"`
    return exe(sql).then( res => {
            if (res && res.affectedRows >= 1) {
                return new successModel("订单删除成功");
            }else{
                return new errorModel("订单删除失败");
            }
        })
}




module.exports = {
    pushOrder,
    changeOrderStatu,
    getAllOrder,
    getClassOrder,
    getNumberOrder,
    deleteOrderForNumber
}