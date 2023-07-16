const reservas = require("../model/reservas");

const ReadAllReservas = async (req, res) => {
  try {
    const query = `SELECT Reservas.id, Usuarios.nome AS
    nome_usuario, Mesas.numero, Mesas.descricao, Restaurantes.nome AS 
    nome_restaurante, Restaurantes.img1 As 
    img_restaurente, Reservas.data, Reservas.hora, Reservas.quantidade_pessoas
    FROM Reservas
    INNER JOIN Usuarios ON Reservas.id_usuario = Usuarios.id
    INNER JOIN Mesas ON Reservas.id_mesa = Mesas.id
    INNER JOIN Restaurantes ON Reservas.id_restaurante = Restaurantes.id;`;

    const response = await reservas.sequelize.query(query);

    return res.status(200).send({ data: response });
  } catch (err) {
    res.status(400).send({ error: "Algo deu errado! " + err, icon: "error" });
  }
};

module.exports = ReadAllReservas;