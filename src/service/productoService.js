const Producto = require("../models/producto");
const { Utils } = require("../utils/utils");
const { Crud } = require("../crud/crud");

const TABLE = "productos";
const UNION = "categorias";
const LOCALFIELD = 'id_categoria';
const FOREIGNFIELD = 'id';
const ALIAS = 'categoria';

const findAll = async () => {
  return await Crud.findAllJoin(TABLE, Producto, LOCALFIELD, FOREIGNFIELD, ALIAS, UNION);
};

const findById = async (id) => {
  return await Crud.findByIdJoin(TABLE, Producto, LOCALFIELD, FOREIGNFIELD, ALIAS, id, UNION);
};

const save = async (data) => {
  return await Crud.save(TABLE, new Producto(jsonData(data)));
};

const update = async (id, data) => {
  const producto = {
    $set: jsonData(data),
  };
  return await Crud.saveU(TABLE, id, producto);
};

const deleteId = async (id) => {
  return await Crud.deleteId(TABLE, id);
};

const jsonData = (data) => {
  return {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    cantida: data.cantida,
    estatus: data.estatus,
    id_categoria: data.id_categoria
  };
};

module.exports.ProductoService = {
  findAll,
  findById,
  save,
  update,
  deleteId,
};
