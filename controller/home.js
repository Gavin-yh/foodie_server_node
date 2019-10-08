const {exe, escape } = require('../DB/mysql')

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
    return exe(food_sql).then((foodData) => {
        if (foodData) {
            if (req.session.userName) {
                const sql = `select * from collect where foodname=${food} and user = "${req.session.userName}"`;
                return exe(sql).then( result => {
                    if (result && result.length > 0) { 
                        //将collect这个字段的数据，依据用户名从collect表查出来的数据，合并collect这个状态;
                        foodData[0].collect = result[0].collect;
                        return foodData;
                    }else{
                        //若在collect表中，没有相应的数据，则说明没有收藏、直接返回food表的单条数据就行。
                        return foodData;
                    }
                })
            }else{
                return foodData;
            }
        }
    })
 }

module.exports = {
    getAllShop,
    getShopDetail,
    getShopFood
}
