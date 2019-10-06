let mysql = require('mysql');
let escape = require('mysql').escape;

let { mysql_config } = require('./config');

let con = mysql.createConnection(mysql_config);

con.connect();

function exe(sql) {
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, function (error, results) {
            return error === null ? resolve(results) : resolve(undefined);
        });
    })
}

module.exports = {  
    exe,
    escape
}











