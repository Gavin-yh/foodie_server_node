var express = require('express');
var router = express.Router();

let {
  selectAllUser,
  selectAllOrder,
  selectSuperMen,

  getUserList,

  getShopInfo,

  updataShop,

  deleteShop,

  getFoods,

  updataFood,

  deleteFood,

  getOrderList,

  getAdmin,

  addShop,

  addFood
} = require('../controller/backend')

//后台系统查询所用的用户/ 当日注册用户
router.get('/user/allUser', (req, res, next) => {
  let { today } = req.query
  selectAllUser(today).then( (result) => {
    res.json(result);
  })
})



/**
 * 获取所有订单或者单日下的订单
 */
router.get('/order/allOrder', (req, res, next) => {
    let { today } = req.query
    selectAllOrder(today).then( (result) => {
        res.json(result);
    })
})

/**
 * 管理员信息
 */
router.get('/superMen', (req, res, next) => {
    selectSuperMen().then(result => {
        res.json(result);
    })
})



/**
 * 获取用户列表
 */
router.get('/userList', (req, res, next) => {
    getUserList().then(result => {
        res.json(result);
    })
})


/**
 * 获取餐馆列表 分页
 * 
 */
router.get('/shopInfo',(req, res, next) => {
    let { offset, limit } = req.query;
    getShopInfo(offset, limit).then( result => {
        res.json(result);
    })
})


/**
 * 更新商店信息
 */
router.post('/updateShop', (req, res, next) => {
    // console.log(req.fields);
    updataShop(req.fields).then(result => {
        res.json(result);
    })

})


/**
 *  软删除商店的数据
*/ 
router.post('/deleteShop', (req, res, next) => {
    // console.log(req.fields);
    deleteShop(req.fields).then(result => {
        res.json(result)
    })
})

/**
 * 删除food
 */
router.post('/deleteFood', (req, res, next) => {
    console.log(req.fields)
    deleteFood(req.fields).then(result => {
        res.json(result)
    })
})
/**
 * 获取食物列表
 */
router.get('/foods', (req, res, next) => {
    let { offset, limit } = req.query;
    getFoods(offset, limit).then(result => {
        res.json(result);
    })
})


/**
 * 食物图片上传  element-ui el-upload  aciton 的地址
 * 返回图片存的路径 (完整的路径)
 * public\images\upload_6f50249bc44b7d8652fd89dae8978845.png 的先将路径整理对
 */
router.post('/upload', (req, res, next) => {
    let imgUrlArr = req.files.file.path.split("\\");
    let complete_path = `http://${req.headers.host}/${imgUrlArr[1]}/${imgUrlArr[2]}`
    res.json({
        statu: 0,
        image_path: complete_path
    });
})

/**
 * 食品信息更新
 */
router.post('/updateFood', (req, res, next) => {
    // console.log(JSON.parse(req.fields.data));
    updataFood(JSON.parse(req.fields.data)).then( result => {
        res.json(result);
    })
})

/**
 * 过去全部订单的信息
 */
router.get('/orders', (req, res, next) => {
    let { offset, limit } = req.query;
    getOrderList(offset, limit).then( result => {
        res.json(result);
    })
})


/**
 * 获取管理员信息 就一个
 */
router.get('/admin', (req, res, next) => {
    // let { offset, limit } = req.query;
    getAdmin().then( result => {
        res.json(result);
    })
})


/**
 * 添加数据： 添加商家
 */
router.post('/addShop', (req, res, next) => {
    addShop(JSON.parse(req.fields.shopData)).then( result => {
        res.json({result});
    })
})


/**
 * 添加具体食品详细
 */
router.post('/addFood', (req, res, next) => {
    addFood(JSON.parse(req.fields.foodData)).then( result => {
            res.json(result)
        }
    )
})



module.exports = router;
