// archivo de configuracion de jsonWebToken ....
const { UsuarioService } = require("../service/usuarioService");
const { Response } = require("../utils/Response");
const createError = require("http-errors");
const debug = require("debug")("app");
const { Utils } = require("../utils/utils");
const jwt = require("jsonwebtoken");
const { Config } = require("../config/config");

/**
 * Controlador para generar el json Wen Token
 * con esto le damos seguridad a nuestro proyecto
 * el cual no retorna un token valido para la aplicacion.
 * */

module.exports.AuthController = {
  auth: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userAuth = await UsuarioService.auth(email);
      if (!userAuth) {
        Response.responseGeneral(res, 401, new createError.Unauthorized());
      } else {
        let pass = await Utils.comparePassword(password, userAuth.password);
        if (!pass) {
          Response.responseGeneral(res, 401, new createError.Unauthorized());
        } else {
          const token = jwt.sign({ userId: userAuth._id }, Config.secret, {
            expiresIn: "1h",
          });
          Response.responseGeneral(res, 200, "sucess", {
            token: `Bearer ${token}`,
          });
        }
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
};
