const express = require('express');
const router = express.Router();
const { Config } = require('../config/config');
const { CategoriaController } = require('../controller/categoriaController');
const { verifyJWT } = require('../security/verifyJwt');

module.exports.CategoriaAPI = (app) => {
    router
    .get('/', verifyJWT.verifyToken, CategoriaController.categorias)
    .put('/:id', verifyJWT.verifyToken, CategoriaController.categoriaU)
    .delete('/:id', verifyJWT.verifyToken, CategoriaController.categoriaD)
    .get('/:id', verifyJWT.verifyToken, CategoriaController.categoria)
    .post('/', verifyJWT.verifyToken, CategoriaController.categoriaC);

    app.use(`${Config.api}categoria`, router);
}


