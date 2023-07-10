const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarios = require("../model/usuarios");

const Login = async (req, res) => {
  
  const { email, senha } = req.body;

  try {
    const users = await usuarios.findAll({ raw: true });

    const user = users.find((data) => data.email === email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordComparisonPromises = await bcrypt.compare(senha, user.senha);

    if (passwordComparisonPromises) {
      let token = jwt.sign({ id: 1 }, "D2DDJSUD726390S8DDSDADWD465G", {
        expiresIn: 86400, // 24 horas em segundos
      });

      return res.json({
        erro: false,
        mensagem: "login",
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: " + error.message,
    });
  }
};

module.exports = Login;
