const express = require('express');
const router = express.Router();

let  {
    getCity
} = require ('../controller/city')
/**
 * 获取城市的路由
 */
router.get('/api/city', (req, res, next) => {
    getCity(req).then((result) => {
        if(result.statu === 0) {
            res.json(result);
        }else{
            res.json([]);
        }       
    })
})



module.exports = router;