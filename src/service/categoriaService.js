const Categoria = require("../models/categoria");
const { Utils } = require("../utils/utils");
const { Crud } = require("../crud/crud");

const TABLE = "categorias";

/**
 * Metodo que recupear todos los datos ingresados en la coleccion.
 * @return retorna todo los datos almencenados en la collection.
 * */
const findAll = async () => {
  return await Crud.findAll(TABLE);
};

/**
 * Metodo que busca un objeto mediante su identificador.
 * @param id identificador del objeto.
 * @return objeto encontrado en el documento.
 * */
const findById = async (id) => {
  return await Crud.findById(TABLE, id);
};

/**
 * Metodo que crea una categoria en la coleccion nueva.
 * @aram data datos nuevos para ingresar.
 * @return una categoria nueva.
 * */
const save = async (data) => {
  let categoria = new Categoria(await jsonData(data));
  return await Crud.save(TABLE, categoria);
};

/**
 *  Metodo que actualiza una colecion del documento.
 *  @param id identificador del objeto.
 *  @param data datos a actualizar.
 *  @return retorna una data nueva.
 */
const update = async (id, data) => {
  const categoria = {
    $set: await jsonData(data),
  };
  return await Crud.saveU(TABLE, id, categoria);
};

/**
 * Metodo que elimna un objeto mediante un identificador.
 * @param id identificador del usuario.
 * @return un valor  1 o 0 dependiendo si se elimina o no.
 * */
const deleteId = async (id) => {
  return await Crud.deleteId(TABLE, id);
};

/**
 * Metodo que crear el objeto json que se usa para crear y actualiza un objeto en el documento.
 * @param data datos que se crearan o actualizaran.
 * @return retorna el objeto creada con los atributos del modelo.
 * */
const jsonData = async (data) => {
  let index = await Crud.indice(TABLE);
  return {
    id: data.id != null ? data.id : index + 1,
    nombre: data.nombre,
    descripcion: data.descripcion,
    estatus: data.estatus,
  };
};

module.exports.CategoriaService = {
  findAll,
  findById,
  save,
  update,
  deleteId,
};
