const express = require('express');
const router = express.Router();

const { changeCollectStatu, getCollectData } = require('../controller/collect');

/**
 * 修改收藏的状态
 */
router.post('/api/collect', (req, res, next) => {
    changeCollectStatu(req.fields).then( result => {
        res.json(result);
    })
})

/**
 * 获取收藏的食物信息
 */
router.get('/api/getCollect', (req, res, next) => {
    const userName = req.query.userName;
    getCollectData(userName).then( result => {
        res.json(result);
    })
})

module.exports = router