const express = require("express");
const cors = require("cors");
const debug = require("debug")("app");
const { Config } = require("./src/config/config");
const { UsuarioAPI } = require("./src/api/usuarioAPI");
const { ClienteAPI } = require("./src/api/clienteAPI");
const { CategoriaAPI } = require("./src/api/categoriaAPI");
const { ProductoAPI } = require("./src/api/productoAPI");
const { LoginAPI } = require("./src/api/authentication");

/**
 * Seccion de configuracion.
 * que acepte formato json.
 * que cualquier aplicacion fron-end se pueda connectar a ala api.
 * **/
const app = express();
app.use(express.json());
app.use(cors());

// todo: seccion que agregan las solicitudes http.
UsuarioAPI(app);
ClienteAPI(app);
CategoriaAPI(app);
ProductoAPI(app);
LoginAPI(app);

// todo: Colocar el puerto donde se realizarn las solicitudes http.
app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto: ${Config.port}`);
});
