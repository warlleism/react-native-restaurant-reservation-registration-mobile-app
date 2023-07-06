const Reservas = require("../model/reservas");

const CreateUser = async (req, res) => {
  var {
    id_usuario,
    id_mesa,
    id_restaurante,
    data,
    hora,
    data,
    quantidade_pessoas,
  } = req.body;

  try {

    const cadastrar = await Reservas.create({
      id_usuario,
      id_mesa,
      id_restaurante,
      data,
      hora,
      data,
      quantidade_pessoas,
    });

    return res.status(200).send({
      status: 200,
      sucess: "Reserva feita com sucesso!",
      icon: "success",
    });
  } catch (err) {
    
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = CreateUser;
