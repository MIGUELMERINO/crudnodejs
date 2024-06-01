const createErorr = require("http-errors");

/**
 * Funcion o metodo que genera un respuesta general para,
 * el usuario que este consultado la api.
 *
 **/

module.exports.Response = {
  responseGeneral: (res, status, message, payload = {}) => {
    let json = {
      status: status,
      message: message ? message : new createErorr.InternalServerError(),
      payload: payload,
    };
    res.status(status).json(json);
  },
};
