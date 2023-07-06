const restaurantes = require("../model/restaurantes");

const ReadOneRestaurante = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await restaurantes.findOne({ where: { id: id } });
    response.dataValues;

    const createArrayDeObjetos = (horarios) =>
      horarios.split(",").map((horario) => ({ horario }));

    const diasUteis = createArrayDeObjetos(response.horarioSem);
    const diasNaoUteis = createArrayDeObjetos(response.horarioFimSem);

    delete response.dataValues.horarioSem;
    delete response.dataValues.horarioFimSem;

    response.dataValues.diasUteis = diasUteis;
    response.dataValues.diasNaoUteis = diasNaoUteis;

    return res.status(200).send({
      data: response,
      diasUteis: diasUteis,
      diasNaoUteis: diasNaoUteis,
    });
  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = ReadOneRestaurante;
