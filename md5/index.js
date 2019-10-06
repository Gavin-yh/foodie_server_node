const crypto = require('crypto');

const  SECRET_KEY = "abhIje_9*90";//钥匙

//创建md5
const md5 = (content) => {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
const cryptoFun = (password) => {
    const str = `password=${password}&key="${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    cryptoFun
}