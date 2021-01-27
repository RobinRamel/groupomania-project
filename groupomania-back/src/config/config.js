require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      port: '8889'
    }
  }
}