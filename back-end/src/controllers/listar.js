const Listar = async (req, res) => {

    return res.json({
        erro: false,
        mensagem: "listar usuário",
        id_usuario_logado: req.userId
    })

}

module.exports = Listar;