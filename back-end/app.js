const express = require('express')
const app = express()
const Routes = require('./src/routes/routes')

app.use(express.json())

app.listen(8080, () => {
    console.log('conectado')
})

app.use(Routes)