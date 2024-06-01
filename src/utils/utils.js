const bcrypt = require("bcrypt");

/**
 * Metodo o funcion que codifica nuestro password para ser almacenado.
 * @param password valor que se codificara para ser almacendo.
 * @return el valor codificado.
 **/
const encodePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Metodo o funcion que valida si el cuerpo enviado en el formato json va lleno
 * @param body cuerpo enviado desde el servicio a la capa controlador.
 * @return retorna un verdadero o un falso.
 * */

const validBody = (body) => {
  return !body || Object.keys(body) === 0 ? true : false;
};

/**
 * Metodo o funcion que obtiene el valor enviado de una servicio como parametro en este caso un ID.
 * @return retorna el valor almacenado en la variable.
 * */
const clave = (req) => {
  return req.params["id"];
};

/**
 * Metodo o funcion que obtiene el valor o payload que se envia desde las solicitud.
 * @return los valores enviados desde una peticion http.
 * */
const payload = (req) => {
  return req.body;
};

/**
 * Metodo o funcion que compara la contraseña o password enviado.
 * para comprobar la autentificacion de nuestro usuario que necesite validar.
 * **/
const comparePassword = async (password, pass) => {
  return await bcrypt.compare(password, pass);
};

module.exports.Utils = {
  encodePassword,
  validBody,
  payload,
  clave,
  comparePassword,
};
