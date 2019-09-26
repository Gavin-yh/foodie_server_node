const express = require('express');
const router = express.Router();

let  {
    getCommon
} = require ('../controller/comment.js')
/**
 * 获取评论的路由
 */
router.get('/api/comment', (req, res, next) => {
    getCommon(req).then((result) => {
        res.setHeader("Cache-Control","max-age=10000");
        res.json(result);           
    })
})



module.exports = router;