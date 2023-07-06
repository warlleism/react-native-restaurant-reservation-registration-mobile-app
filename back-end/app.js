const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const Routes = require("./src/routes/routes");

require("./src/database/db");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.listen(8080, () => {
  console.log("conectado");
});

app.use(Routes);
