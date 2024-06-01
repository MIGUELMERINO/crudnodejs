const express = require('express');
const router = express.Router();
const { Config } = require('../config/config');
const { UsuarioController } = require('../controller/usuarioController');
const { verifyJWT } = require('../security/verifyJwt');

/**
 * Metodo o funcion que da de alta las solicitedes http(s)
 * @param app parametro que contiene a express
 */
module.exports.UsuarioAPI = (app) => {
    router
    .get('/', verifyJWT.verifyToken, UsuarioController.usuarios)
    .put('/:id', verifyJWT.verifyToken, UsuarioController.usuarioU)
    .delete('/:id', verifyJWT.verifyToken, UsuarioController.usuarioD)
    .get('/:id', verifyJWT.verifyToken, UsuarioController.usuario)
    .post('/', verifyJWT.verifyToken, UsuarioController.usuarioC);

    app.use(Config.api+'usuario', router);
}

