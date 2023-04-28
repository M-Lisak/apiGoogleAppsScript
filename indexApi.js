const express = require('express')
const sequelize = require('./db')
const UserModel = require('./models');

const app = express()
const port = 3000

app.get('/', (req, res) =>  {
    console.log("req", req.headers)
    res.send('connected!')
})

//в ответ отправлять объект с полем isPaid

app.get('/bd', async (req, res) => {
    const { authorization } = req.headers || {}
    console.log('authorization', authorization)
    if(!authorization) return
    //подключаемся к БД
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("подключенно к БД")
    } catch (e) {
        console.log('error', e)
        console.log("подключение к БД сломалось")
    }
    //получаем нашего пользователя
    const isUserCreate = await UserModel.findOne({ where: { key_API: `${authorization}` } })
    console.log('isUserCreate', isUserCreate)

    if(isUserCreate && isUserCreate.dataValues && isUserCreate.dataValues.paidUpTo) {
        console.log("true", isUserCreate.dataValues.paidUpTo)
        if(isUserCreate.dataValues.paidUpTo.getTime() > new Date().getTime()) {
            //всё збс, можно вернуть true или что-то более интересное
            // res.send(`всё в порядке, подписка оплачена до${isUserCreate.dataValues.paidUpTo}`)
            res.json({ isPaid: true, description: `Подписка оплачена до${isUserCreate.dataValues.paidUpTo}` })
        } else {
            //не оплачена подписка
            res.json({ isPaid: false, description: `Закончилось действие подписки`})
        }
    }
    console.log('err')
    res.json({ isPaid: false, description: `Пользователь не найден` })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))