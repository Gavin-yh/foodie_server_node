let express = require('express');
let router = express.Router();

let {
    pushOrder,
    changeOrderStatu,
    getAllOrder,
    getClassOrder,
    getNumberOrder,
    deleteOrderForNumber
} = require('../controller/order')

/**
 *  创建订单数据
 */
router.post('/api/pushOrder', (req, res, next) => {
    pushOrder(req).then(result => {
        res.json(result);
    })
})


/**
 * 在支付页面模拟支付时 修改订单状态
 */

router.post('/api/updateStatu', (req, res, next) => {
    changeOrderStatu(req).then(result => {
        res.json(result);
    })
})


/**
 * 获取所有的订单 (全部订单)
 */
router.get('/api/getAllOrder', (req, res, next) => {
    getAllOrder().then( result => {
        res.json(result)
    })
})


/**
 * 根据相应的类型，获取订单，如未付款、待使用等
 */
router.get('/api/getClassOrder', (req, res, next) => {
    const param = req.query.classfy
    getClassOrder(param).then( result => {
        res.json(result);
    })
})
 

/**
 * 按照订单编号来获取订单
 * 用于订单的详情页   orderDetail
 */

 router.get('/api/getNumberOrder', (req, res, next) => {
     const param = req.query.number;
     getNumberOrder(param).then(result => {
         res.json(result);
     })
 })


 /**
  * 根据订单编号来删除订单
  * 取消为付款的订单
  */
  router.post('/api/deleteOrder', (req, res, next) => {
     const param = req.fields.number;
     deleteOrderForNumber(param).then(result => {
        //删除后再将剩余的数据差出来
        getClassOrder("未支付").then( result => {
             res.json(result);
        })
     })
 })

module.exports = router;