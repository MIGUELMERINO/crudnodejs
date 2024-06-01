const Producto = require("../models/producto");
const { Utils } = require("../utils/utils");
const { Crud } = require("../crud/crud");

/**
 * seccion donde se colocan los nombre de las collections o tablas creadas en mongodb.
 * crearmos tambien una union con otra tabla.
 * creamos los datos que se van a relaciones entre las tablas.
 * colocamos el nombre del objeto o array que de va ad esplegar dentro de nuestro Json mediante un alias.
 * **/
const TABLE = "productos";
const UNION = "categorias";
const LOCALFIELD = "id_categoria";
const FOREIGNFIELD = "id";
const ALIAS = "categoria";

/**
 * Metodo o funcion que obtiene los valores dentro de una collection.
 * @return retorna todos lo datos encontrados en la collection.
 * **/
const findAll = async () => {
  return await Crud.findAllJoin(
    TABLE,
    Producto,
    LOCALFIELD,
    FOREIGNFIELD,
    ALIAS,
    UNION,
  );
};

/**
 * Metodo que busca un valor dentro de una collection.
 * @param id identificador del objeto dentro del documento o collection.
 * @return un valor encontrado mediante su id.
 * **/
const findById = async (id) => {
  return await Crud.findByIdJoin(
    TABLE,
    Producto,
    LOCALFIELD,
    FOREIGNFIELD,
    ALIAS,
    id,
    UNION,
  );
};

/**
 * Metodo que guarda o ingresa los valores a un documento o collection.
 * @param data valores necesario que deben ser iguales al modelo de datos.
 * @return retorn un objeto registrado dento del documento o collection.
 * **/
const save = async (data) => {
  return await Crud.save(TABLE, new Producto(jsonData(data)));
};

/**
 * Metodo que actualiza los datos dentro de un documento o collection.
 * @param id identificador de objeto.
 * @param data datos a actualizar dentro del objeto.
 * @return un valor uno o cero.
 * **/
const update = async (id, data) => {
  const producto = {
    $set: jsonData(data),
  };
  return await Crud.saveU(TABLE, id, producto);
};

/**
 * Metodo o funcion que elimina del documento un elemento o collection.
 * @param id identificador del objeto.
 * @return retorna un valor uno o cero.
 * **/
const deleteId = async (id) => {
  return await Crud.deleteId(TABLE, id);
};

/**
 * Metodo o funcion que crea el objeto mediante un modelo de datos.
 * @param data datos para crear o actualzar.
 * @return un objeto en base a un modelo.
 * **/
const jsonData = (data) => {
  return {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    cantida: data.cantida,
    estatus: data.estatus,
    id_categoria: data.id_categoria,
  };
};

module.exports.ProductoService = {
  findAll,
  findById,
  save,
  update,
  deleteId,
};
