const {Sequelize } = require('sequelize')

module.exports = new Sequelize(
    //вводим данные для подключения к базе данных: сперва имя бд, юзер, пароль
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    //затем так добавляем хост и порт
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)