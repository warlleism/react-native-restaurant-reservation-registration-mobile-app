const Usuarios = require("../model/usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const CreateUser = async (req, res) => {
  var { nome, foto, email, senha } = req.body;

  const crypSenha = bcrypt.hashSync(senha, 8);

  try {
    const cadastrar = await Usuarios.create({
      nome,
      foto,
      email,
      senha: crypSenha,
    });

    let token = jwt.sign({ id: 1 }, "D2DDJSUD726390S8DDSDADWD465G", {
      expiresIn: 86400, // 24 horas em segundos
    });

    return res.status(200).send({
      status: 200,
      sucess: "Cadastro feito com sucesso!",
      icon: "success",
      token: token,
    });
  } catch (err) {
    res.status(400).send({ error: "Ocorreu um erro inesperado!", status: 400 });
  }
};

module.exports = CreateUser;
