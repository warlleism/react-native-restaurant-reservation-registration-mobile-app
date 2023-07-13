const sequelize = require("sequelize");
const config = require("../config/config");
const Reservas = require("../model/reservas");
const Restaurantes = require("../model/restaurantes");
const Usuarios = require("../model/usuarios");
const Mesas = require("../model/mesas");
const connection = new sequelize(config);

Reservas.init(connection);
Restaurantes.init(connection);
Usuarios.init(connection);
Mesas.init(connection);

module.exports = connection;
