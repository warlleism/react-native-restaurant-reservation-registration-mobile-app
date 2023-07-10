const express = require("express");
const Router = express.Router();
const { eAdmin } = require("../middleware/auth");
const Login = require("../controllers/login");
const novaReserva = require("../controllers/create-reserva");
const ReadAllRestaurantes = require("../controllers/read-all-restaurantes");
const ReadOneRestaurante = require("../controllers/read-one-restaurante");
const CreateUsuario = require("../controllers/create-usuario");

Router.get("/todosRestaurantes", eAdmin, ReadAllRestaurantes);

Router.get("/umRestaurantes", eAdmin, ReadOneRestaurante);

Router.post("/cadastrar", CreateUsuario);

Router.post("/novaReserva", eAdmin, novaReserva);

Router.post("/login", Login);

module.exports = Router;
