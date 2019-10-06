const express = require('express');
const router = express.Router();

let  {
    getCommon,
    addComment
} = require ('../controller/comment.js')
/**
 * 获取评论的路由
 */
router.get('/api/comment', (req, res, next) => {
    getCommon(req).then((result) => {
        res.json(result);           
    })
})


/**
 * 添加评论
 */
router.post('/api/addComment', (req, res, next) => {
    addComment(req).then(result => {
        res.json(result)
    })
})

module.exports = router;