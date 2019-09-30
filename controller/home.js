const exe = require('../DB/mysql')
const {successModel, errorModel } = require('../model/resModel')

/**
 * home page allshop data
 */
let getAllShop = () => {
    const sql = "select * from allshop";
    return exe(sql).then((res) => {
        if (res) {
            return new successModel(res);
        }else{
            return new errorModel();
        }
    })
}

/**
 * shopdetail data
 * param{ shop name}
 */
let getShopDetail = (req) => {
    const query = req.query.shopName;
    const shop_sql = `select * from shopdetail where shop_name=${query};`
    return exe(shop_sql).then((shop) => {
        // console.log(shop)
        if (shop) {
                return new successModel(shop);
        }else{
            return new errorModel();
        }

        
    })
}


/**
 *  get shop food
 */

 let getShopFood = (req) => {
    const shopName = req.query.shopName;
    const food = req.query.foodname;
    let food_sql = `select * from food where food.s_name=${shopName};`
     if (food) {
        food_sql = `select * from food where food.s_name=${shopName} and foodname = ${food} ;`
     }
    return exe(food_sql).then((food) => {
        if (food) {
            return food;
        }
    })
 }

module.exports = {
    getAllShop,
    getShopDetail,
    getShopFood
}
