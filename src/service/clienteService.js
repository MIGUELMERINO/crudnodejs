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
 * 
 *
 * **/
const save = async (data) => {
  let cliente = new Cliente(jsonData(data));
  return await Crud.save(TABLE, cliente);
};

const update = async (id, data) => {
  const cliente = {
    $set: jsonData(data),
  };
  return await Crud.saveU(TABLE, id, cliente);
};

const deleteId = async (id) => {
  return await Crud.deleteId(TABLE, id);
};

const jsonData = (data) => {
  return {
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
