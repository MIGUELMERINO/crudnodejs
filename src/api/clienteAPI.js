const express = require('express');
const router = express.Router();
const { Config } = require('../config/config');
const { ClienteController } = require('../controller/ClienteController');
const { verifyJWT } = require('../security/verifyJwt');

module.exports.ClienteAPI = (app) => {
    router
    .get('/', verifyJWT.verifyToken, ClienteController.clientes)
    .put('/:id', verifyJWT.verifyToken, ClienteController.clienteU)
    .delete('/:id', verifyJWT.verifyToken, ClienteController.ClienteD)
    .get('/:id', verifyJWT.verifyToken, ClienteController.cliente)
    .post('/', verifyJWT.verifyToken, ClienteController.clienteC);

    app.use(`${Config.api}cliente`, router);
}


