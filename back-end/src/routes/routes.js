const express = require('express')
const Router = express.Router()
const { eAdmin } = require('../middleware/auth')
const Login = require('../controllers/login')
const Listar = require('../controllers/listar')

Router.get('/', eAdmin, Listar)

Router.get('/cadastrar', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "usuário cadastrar",
    })
})

Router.post('/login', Login )
   


module.exports = Router;