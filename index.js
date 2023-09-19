require('dotenv').config()
const express = require('express')
const models = require('./models/models')


//импортируем объект сделанный в файле дб.жс
const sequelize = require('./db')

const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
//для получения файлов из папки статик, обращаясь к ним по имени файла
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//мидлвара которая обрабатывает ошибки должна регистрироваться в самом конце
//поэтому мы нигде здесь не вызвали функцию некст, ибо метод замыкающий
app.use(errorHandler)

const PORT = process.env.PORT || 5000

//вызов функции start для подключения к базе данных.
// все операции с базой данных ассинхронны.
//переносим в блок трай функцию listen
// start() -- не забываем эту функцию вызвать
const start = async ()=> {
    try{
        //с помощью аутентификации подключаемся к бд. опять таки, функция ассинхронна
        await sequelize.authenticate()
        await sequelize.sync() //
        app.listen(PORT, ()=> console.log(`Server was started on port ${PORT}`))
    }catch (err) {
        console.log(err.message)
    }

}

start()