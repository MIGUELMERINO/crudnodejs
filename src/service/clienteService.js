const Cliente = require("../models/cliente");
const { Utils } = require("../utils/utils");
const { Crud } = require("../crud/crud");

const TABLE = "clientes";

/**
 * Metodo que obtiene todos los valores dentro de un documento o collection.
 * @return todos los valores dentro del documento.
 * **/
const findAll = async () => {
  return await Crud.findAll(TABLE);
};

/**
 * Metodo que obtiene un elemento de la collection por su identificador.
 * @param id Indentificador de elemento almacenado.
 * @return un elemento encontrado dentro de la collection.
 * **/
const findById = async (id) => {
  return await Crud.findById(TABLE, id);
};

/**
 * Metodo o funcion que guarda en el documento.
 * @param data datos para crear los valores.
 * @return retorna una collection registrada.
 * **/
const save = async (data) => {
  let cliente = new Cliente(await jsonData(data));
  return await Crud.save(TABLE, cliente);
};

/**
 * Metodo o funcion que actualiza los datos de la colleccion registrada.
 * @param id identificador del documento.
 * @param data datos que de debe actualizar.
 * @return retorna un valor actualizado.
 * **/
const update = async (id, data) => {
  const cliente = {
    $set: await jsonData(data),
  };
  return await Crud.saveU(TABLE, id, cliente);
};

/**
 * Metodo o funcion que elimina un objeto del documento.
 * @param id identificador de la collection.
 * @return un valor 1 si ha sido eliminado.
 * **/
const deleteId = async (id) => {
  return await Crud.deleteId(TABLE, id);
};

/**
 * Metodo o funcion que crear el modelo de datos para ser registrado o actualizados.
 * @prarm data datos que de debe ingresar dentro del metodo save y update.
 * @return estructura del modelo.
 * **/
const jsonData = async (data) => {
  let index = await Crud.indice(TABLE);
  return {
    id: data.id != null ? data.id : index + 1,
    nombre: data.nombre,
    apaterno: data.apaterno,
    amaterno: data.amaterno,
    rfc: data.rfc,
    estatus: data.estatus,
  };
};

module.exports.ClienteService = {
  findAll,
  findById,
  save,
  update,
  deleteId,
};
