const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { email, senha } = req.body;

  let users = [
    {
      id: 1,
      email: "warllei.s.martins@hotmail.com",
      senha: bcrypt.hashSync("123", 8),
    },
    {
      id: 2,
      email: "warlleimartins@hotmail.com",
      senha: bcrypt.hashSync("321", 8),
    },
    {
      id: 3,
      email: "warlleimartinsdev@outlook.com",
      senha: bcrypt.hashSync("123456", 8),
    },
  ];

  const user = users.find((data) => data.email === email);

  const passwordComparisons = await Promise.all(
    users.map(async (e) => {
      return await bcrypt.compare(senha, e.senha);
    })
  );

  const senhaAuth = passwordComparisons.some((result) => result === true);

  let token = jwt.sign({ id: 1 }, "D2DDJSUD726390S8DDSDADWD465G", {
    expiresIn: 86400, // 24 horas em segundos
  });

  if (user && senhaAuth) {
    return res.json({
      erro: false,
      mensagem: "login",
      token,
    });
  }

  return res.status(400).json({
    erro: true,
    mensagem: "Erro: usuário ou senha incorreta!",
  });
};

module.exports = Login;
