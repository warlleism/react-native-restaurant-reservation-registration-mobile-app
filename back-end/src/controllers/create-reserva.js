const Reservas = require("../model/reservas");

const CreateReserva = async (req, res) => {

  var { id_usuario, id_mesa, id_restaurante, data, hora, quantidade_pessoas } =
    req.body;

  console.log(id_usuario);

  try {
    const cadastrar = await Reservas.create({
      id_usuario,
      id_mesa,
      id_restaurante,
      data,
      hora,
      quantidade_pessoas,
    });

    return res.status(200).send({
      status: 200,
      sucess: "Reserva feita com sucesso!",
      icon: "success",
    });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Sinto Muito! Local já reservado", status: 400 });
  }
};

module.exports = CreateReserva;
