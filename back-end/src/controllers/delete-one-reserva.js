const Reserva = require("../model/reservas");

const DeleteReserva = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await Reserva.destroy({ where: { id: id } });
    return res.status(200).send({ data: response, status: 200 });
  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = DeleteReserva;
