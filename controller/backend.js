const {
    exe,
    escape
} = require('../DB/mysql')
const {
    successModel,
    errorModel
} = require('../model/resModel')

/**
 * 后台系统查询所有的用户
 */
let selectAllUser = (today) => {
    //有相应日期的话，就回去相应天的用户注册量，没有的话就获取全部的数据
    let sql = `select * from user`;
    if (today) {
        sql = `select * from user where register_time = "${today}"`;
    }
    return exe(sql).then(result => {
        if (result && result.length > 0) {
            return new successModel({
                count: result.length
            });
        } else {
            return new errorModel({
                count: 0
            });
        }
    })
}

/**
 * 
 * @param {*} today  日期
 * 订单相关的数据
 */
let selectAllOrder = (today) => {
    //有相应日期的话，就回去相应当天的订单量，没有的话就获取全部的数据
    let sql = `select * from ordertable`;
    if (today) {
        sql = `select * from ordertable where order_time = "${today}"`;
    }

    return exe(sql).then(result => {
        if (result && result.length > 0) {
            return new successModel({
                count: result.length
            });
        } else {
            return new errorModel({
                count: 0
            });
        }
    })
}

/**
 * 管理员相关的数据
 */
let selectSuperMen = () => {
    let sql = "select * from user where power='1'";
    return exe(sql).then(result => {
        if (result && result.length > 0) {
            return new successModel({
                count: result.length
            });
        } else {
            return new errorModel({
                count: 0
            });
        }
    })
}



/**
 * 获取用户列表
 */
let getUserList = () => {
    let sql = `select * from user where power="0"`;
    return exe(sql).then(result => {
        if (result && result.length > 0) {
            return new successModel(result);
        } else {
            return new errorModel({});
        }
    })
}

/**
 * 获取餐馆列表 分页查询
 */
let getShopInfo = (offset, limit) => {
    let sql = `select * from shopdetail where statu = "0"`;
    if (offset !== "undefined") {
        sql = `select * from shopdetail where statu ="0" limit ${offset}, ${limit}`;
    }
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        } else {
            return new errorModel({});
        }
    })
}



/**
 * 更新商店的信息
 */
let updataShop = (param) => {
    let {
        shop_name,
        food_recom,
        detail_location,
        phone
    } = param
    let sql = `update shopdetail set food_recom = "${food_recom}",detail_location = "${detail_location}", phone="${phone}" where shop_name ="${shop_name}";;`
    return exe(sql).then(res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("成功");
        } else {
            return new errorModel("失败");
        }
    })
}


/**
 * 删除商店的信息  软删除  --> 改变statu 的状态
 */
let deleteShop = (param) => {
    let {
        shop_name,
        statu
    } = param;
    console.log(param)
    let sql = `update shopdetail set statu = "${statu}" where shop_name = "${shop_name}"`;
    return exe(sql).then(res => {
        if (res && res.affectedRows >= 1) {
            let sql1 = `update allshop set statu = "${statu}" where s_name = "${shop_name}"`
            return exe(sql1).then(result => {
                if(result && result.affectedRows >= 1) {
                    return new successModel("成功");
                }
                return new errorModel("失败")
            })
        }
        return new errorModel("失败");
    })
}

/**
 * 获取食物列表
 */
let getFoods = (offset, limit) => {
    let sql = `select * from food`;
    if (offset !== "undefined") {
        sql = `select * from food limit ${offset}, ${limit}`;
    }
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        } else {
            return new errorModel({});
        }
    })
}


/**
 * 更新食品信息, 图片可以传，也可以不更新，但是其他数据不能为空，在前端数据进行判断了。
 */
let updataFood = (data) => {
    let {
        name,
        price,
        restaurant_name,
        restaurant_address,
        imgage_path
    } = data;
    console.log(name, price, restaurant_address, restaurant_name, imgage_path);

    let sql = `update food set s_name = "${restaurant_name}",price = "${price}",shop_info = "${restaurant_address}" where foodname = "${name}"`
    //图片有传的话就更新图片的地址
    if (imgage_path) {
        sql = `update food set s_name = "${restaurant_name}",price = "${price}",shop_info = "${restaurant_address}",  title_img = "${imgage_path}" where foodname = "${name}"`
    }
    return exe(sql).then(res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("成功");
        } else {
            return new errorModel("失败");
        }
    })

}

/**
 * 删除食品
 */
let deleteFood = (data) => {
    const foodname  = data.foodname;
    const shopname = data.shopname;
    let sql = `delete from food where foodname = "${foodname}" and s_name = "${shopname}"`
    return exe(sql).then(res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("成功");
        } else {
            return new errorModel("失败");
        }
    })
}


/**
 *  过去全部订单
 */

let getOrderList = (offset, limit) => {
    let sql = `select * from ordertable limit ${offset}, ${limit}`
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        } else {
            return new errorModel({});
        }
    })
}


/**
 * 过去管理员信息
 */
let getAdmin = (offset, limit) => {
    let sql = `select * from user where power ="1" `;
    return exe(sql).then(res => {
        if (res && res.length > 0) {
            return new successModel(res);
        } else {
            return new errorModel({});
        }
    })
}

/**
 * 添加商家信息
 * 同时向两个表添加数据
 * allShop  shopdetail 
 */
let addShop = (params) => {
    let {
        name,
        address,
        description,
        food_recom,
        phone,
        price,
        image_path,
        category
    } = params;
    // allShop  -> s_name location price classgy dec img_title num type
    //shopDetail -> shop_name img_url food_recom detail_location phone statu
    let allShopSql = `insert into allshop(s_name,location,price,classfy,\`dec\`,title_img, num, \`type\`,statu) 
                    values("${name}","${address}",${Number(price)},"${category}","${description}","${image_path}", 0, "${category}",0);`
    let shopDetailSql =`insert into shopdetail(shop_name,img_url,food_recom,detail_location, phone, statu)
                     values("${name}","${image_path}","${food_recom}","${address}","${phone}", 0)`

    return Promise.all([exe(allShopSql), exe(shopDetailSql)])
                      .then( res => {
                          if (res[0] && res[0].affectedRows >= 1 && res[1].affectedRows >= 1) {
                              return new successModel("success")
                          }
                      })
                      .catch( error => {
                          return new errorModel(error)
                      })
}

/**
 * 添加具体食品信息
 */

 let addFood = (params) => {
     console.log(params)
     let {
         name,  //食品的名称
         price,
         shop_name,
         address,
         image_path,
     } = params
     let sql = `insert into food(s_name,star_num,num,sold,price,foodname,shop_info,title_img,collect)
                values("${shop_name}","0","0","0","${price}","${name}","${address}","${image_path}","false");`
    return exe(sql).then(res => {
        if (res && res.affectedRows >= 1) {
            return new successModel("成功");
        } else {
            return new errorModel("失败");
        }
    })
 }



module.exports = {
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
}