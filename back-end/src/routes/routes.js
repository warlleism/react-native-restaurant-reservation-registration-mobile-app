const express = require("express");
const Router = express.Router();
const { eAdmin } = require("../middleware/auth");
const Login = require("../controllers/login");
const Listar = require("../controllers/listar");
const novaReserva = require("../controllers/create-reserva");
const ReadAllRestaurantes = require("../controllers/read-all-restaurantes");
const ReadOneRestaurante = require("../controllers/read-one-restaurante");

Router.get("/", eAdmin, Listar);

Router.get("/todosRestaurantes", eAdmin, ReadAllRestaurantes);

Router.get("/umRestaurantes", eAdmin, ReadOneRestaurante);

Router.get("/cadastrar", eAdmin, async (req, res) => {
  return res.json({
    erro: false,
    mensagem: "usuário cadastrar",
  });
});

Router.post("/novaReserva", eAdmin, novaReserva);

Router.post("/login", Login);

module.exports = Router;
