const express = require("express");
const router = express.Router();
const { Config } = require("../config/config");
const { ProductoController } = require("../controller/productoController");
const { verifyJWT } = require('../security/verifyJwt');

module.exports.ProductoAPI = (app) => {
  router
    .get("/", verifyJWT.verifyToken, ProductoController.productos)
    .put("/:id", verifyJWT.verifyToken, ProductoController.productoU)
    .delete("/:id", verifyJWT.verifyToken, ProductoController.productoD)
    .get("/:id", verifyJWT.verifyToken, ProductoController.producto)
    .post("/", verifyJWT.verifyToken, ProductoController.productoC);

  app.use(`${Config.api}producto`, router);
};
