const Mesas = require("../model/mesas");

const ReadAllMesas = async (req, res) => {

  const { id } = req.body;
  
  try {
    const response = await Mesas.findAll({ where: { id_restaurante: id } });

    return res.status(200).send({ data: response });
  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = ReadAllMesas;
