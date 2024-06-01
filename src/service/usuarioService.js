const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { Utils } = require("../utils/utils");
const { Crud } = require("../crud/crud");

const TABLA = "usuarios";

/**
 * Metedo que obtiene todos los registro almencenado en el documento en mongodb
 * @return retorna un coleccion de datos o un lista de objetos.
 *
 */
const findAll = async () => {
  return await Crud.findAll(TABLA);
};

/**
 * Metodo que obtiene un valor mediante su identificador.
 * @aram id  identificador tipo has,
 * @return retorna un objeto json.
 *
 * */
const findById = async (id) => {
  return await Crud.findById(TABLA, id);
};

/**
 * Metodo que crear un registro nuevo al documento.
 * @param data datos para crear el registro.
 * @return retorna un registro nuevo.
 *
 * */
const save = async (data) => {
  let usuario = new Usuario(await jsonData(data));
  return await Crud.save(TABLA, usuario);
};

/**
 * Metodo que actualiza un registro o documento,
 * @param id indentificador del documento.
 * @param data datos para actualizar el registro.
 * @return un registro actualizado.
 *
 * */
const update = async (id, data) => {
  const usuario = {
    $set: await jsonData(data),
  };
  return await Crud.saveU(TABLA, id, usuario);
};

/**
 * Metdo que elimina un documento o registro por su identificador
 * @param id identificador del regristro.
 * @return retorna valores para la actualizacion.
 * */
const deleteId = async (id) => {
  return await Crud.deleteId(TABLA, id);
};

/**
 * Metod para crear la authentificacion de los usuarios.
 * @param email correo del usuario a validar su registro.
 * @return usaurio auntentifaco o null.
 */
const auth = async (email) => {
  return await Crud.authentication(TABLA, email);
};

/**
 * Creamos una funcion que llena los valores de nuestra aplicacion.
 * asi como los actualiza.
 * */
const jsonData = async (data) => {
  return {
    email: data.email,
    password: await Utils.encodePassword(data.password),
    nombre: data.nombre,
    apaterno: data.apaterno,
    amaterno: data.amaterno,
    activo: data.activo,
    perfil: data.perfil,
  };
};

// exportamos para desde cualquier parte podemos importarlo y ocuparlos.
module.exports.UsuarioService = {
  findAll,
  findById,
  save,
  update,
  deleteId,
  auth,
};
