let mysql_config = {
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'foodie'
}

let redis_config = {
  host: "127.0.0.1",
  // host: "100.64.107.215",
  port: 6379,
}

module.exports = {
  mysql_config,
  redis_config
}