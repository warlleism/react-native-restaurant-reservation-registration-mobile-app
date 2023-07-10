const express = require("express");
const Router = express.Router();
const { eAdmin } = require("../middleware/auth");
const Login = require("../controllers/login");
const novaReserva = require("../controllers/create-reserva");
const ReadAllRestaurantes = require("../controllers/read-all-restaurantes");
const ReadOneRestaurante = require("../controllers/read-one-restaurante");
const ReadOneUsuario = require("../controllers/read-one-usuario");
const CreateUsuario = require("../controllers/create-usuario");

Router.get("/todosRestaurantes", ReadAllRestaurantes);

Router.get("/umRestaurantes", eAdmin, ReadOneRestaurante);

Router.post("/umUsuario", eAdmin, ReadOneUsuario);

Router.post("/cadastrar", CreateUsuario);

Router.post("/novaReserva", eAdmin, novaReserva);

Router.post("/login", Login);

module.exports = Router;
