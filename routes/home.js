var express = require('express');
var router = express.Router();
let {
  getAllShop,
  getShopDetail,
  getShopFood
} = require('../controller/home')

/* GET allshop page. */
router.get('/api/home', function(req, res, next) {
  getAllShop().then((result) => {
    if (result) {
      res.setHeader("Cache-Control","max-age=10000");
      res.json(result);
    }
  })
});

/**
 * get shopdetail
 */
router.get('/api/shopdetail',function(req, res, next){
  getShopDetail(req).then( (shop) => {
    getShopFood(req).then( (food) => {
      if (shop.statu === 0) {
        shop.data[0].food = food;
        res.json(shop)
      }
    })
  })
})
module.exports = router;





