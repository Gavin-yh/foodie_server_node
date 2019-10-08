const { exe } = require('../DB/mysql')
const {successModel, errorModel} = require('../model/resModel')



/**
 * 修改食物的收藏状态
 */
let changeCollectStatu = (params) => {
    let {
        title_img,
        s_name,
        foodname,
        price,
        sold,
        collect,
        user
    } = params;
    const sql = `insert into collect(title_img,s_name,foodname,price,sold,collect,user)
                values("${title_img}","${s_name}","${foodname}","${price}","${sold}","${collect}","${user}");`

    //查询该用户下在表collect中是否存在foodname这个食物名称的数据,方便下一步操作，如果没有就新插入，有就更改表中的状态
    const sql1 = `select * from collect where foodname="${foodname}" and user = "${user}"`;
   
    const sql2 = `update collect set collect = "${collect}" where foodname="${foodname}" and user = "${user}"`;
    return exe(sql1).then( res => {
        // 查询有没有相应的记录 没有的话就插入一条新的数据
        if (res && res.length == 0) {
            return exe(sql).then( result => {  
                    if (result && result.affectedRows >= 1) {
                        return new successModel("操作成功");
                    }else{
                        return new errorModel("操作失败");
                    }
                })
        } else{
            //有记录的话，就相应的更改collect状态. 更改的都是collect表中的状态，查询的时候更具登录的用户名，以及foodname
                //去查询collect表中的数据，将字段collect的值赋值给food表中查出来的collect字段。整合数据返回给前端。

            //food表中的collect这个字段永远都是false；因为没有登入的时候，都是未收藏的状态，只有登入了才能收藏，
            //在这里也只有登入了才有权看到有没有收藏
            return exe(sql2).then(result => {
                    if (result && result.affectedRows >= 1) {
                        return new successModel("操作成功");
                    }else{
                        return new errorModel("操作失败");
                    }
            })
        }
    })
}




let getCollectData = (userName) => {
    const sql = `select * from collect where collect ="true" and user="${userName}"`;
    return exe(sql).then(res => {
        if (res && res.length) {
            return new successModel(res);
        }else {
            return new errorModel();
        }
    })
}
module.exports = {
    changeCollectStatu,
    getCollectData
}