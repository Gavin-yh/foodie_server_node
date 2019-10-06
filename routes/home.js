var express = require('express');
var router = express.Router();
let {
  getAllShop,
  getShopDetail,
  getShopFood
} = require('../controller/home')

/* GET allshop page. */
router.get('/api/home', (req, res, next) => {
  getAllShop().then((result) => {
    if (result) {
      res.json(result);
    }
  })
});

/**
 * get shopdetail
 * 
 * shopDetail 页面用到 --》提供一参数 shopName
 * 
 * foodDetail 页面用到 --》 提供两个参数 shopname foodname
 */
router.get('/api/shopdetail', (req, res, next) => {
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





