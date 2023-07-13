const express = require("express");
const Router = express.Router();
const { eAdmin } = require("../middleware/auth");
const Login = require("../controllers/login");
const novaReserva = require("../controllers/create-reserva");
const ReadAllRestaurantes = require("../controllers/read-all-restaurantes");
const ReadOneUsuario = require("../controllers/read-one-usuario");
const ReadAllMesas = require("../controllers/read-all-mesas");
const CreateUsuario = require("../controllers/create-usuario");

Router.get("/todosRestaurantes", ReadAllRestaurantes);

Router.post("/mesa", ReadAllMesas);

Router.post("/umUsuario", eAdmin, ReadOneUsuario);

Router.post("/cadastrar", CreateUsuario);

Router.post("/novaReserva", eAdmin, novaReserva);

Router.post("/login", Login);

module.exports = Router;
