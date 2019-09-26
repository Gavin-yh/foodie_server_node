const express = require('express');
const router = express.Router();

let {
    getImgBar
} = require( '../controller/imgbar')

router.get('/api/imgbar', (req, res, next) => {
    let param = req.query;
    getImgBar(param).then(result => {
        if(result.statu === 0) {
            res.setHeader("Cache-Control","max-age=10000");
            res.json(result.data);
        }else{
            res.json([]);
        }
    })
})

module.exports = router;
