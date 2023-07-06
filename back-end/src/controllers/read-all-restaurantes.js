const restaurantes = require("../model/restaurantes");

const ReadAllRestaurantes = async (req, res) => {

  try {
    console.log('teste')
    
    const response = await restaurantes.findAll();
    
    
    return res.status(200).send({data: response});

  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = ReadAllRestaurantes;
