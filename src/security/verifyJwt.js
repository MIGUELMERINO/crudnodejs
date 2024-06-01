const debug = require("debug")("app");
const createError = require("http-errors");
const { Response } = require("../utils/Response");
const jwt = require("jsonwebtoken");
const { Config } = require("../config/config");

/**
 * Metodo o funcion que validara si el token un esta activo,
 * si el token esta generado por el algoritmo de este proyecto.
 * */

module.exports.verifyJWT = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        Response.responseGeneral(res, 401, createError.Unauthorized());
      } else {
        const jwToken = token.split(" ")[1];
        const decode = jwt.verify(jwToken, Config.secret);
        req.userId = decode.userId;
        next();
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
};
