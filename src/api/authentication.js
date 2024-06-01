const express = require('express');
const router = express.Router();
const { Config } = require('../config/config');
const { AuthController } = require('../security/jwtoken');

module.exports.LoginAPI = (app) => {
    router.post('/', AuthController.auth)
    app.use(Config.api + 'authentication', router);
} 



