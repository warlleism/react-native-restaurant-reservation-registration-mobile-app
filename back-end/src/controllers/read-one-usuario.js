const Usuarios = require("../model/usuarios");

const ReadOneUsuario = async (req, res) => {

  const { id } = req.body;
  
  try {
    const response = await Usuarios.findOne({ where: { id: id } });


    return res.status(200).send({
      data: response,
    });
  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = ReadOneUsuario;
