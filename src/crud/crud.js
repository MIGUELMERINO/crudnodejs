const { ObjectId } = require("mongodb");
const { ConnectionDB } = require("../config/connection");

/**
 * Metodo o funcion que obtiene todos los registros de la colleccion o documento.
 * @param collections nombre de la coleccion (tabla o documento).
 * @return una consulta de mongo para obtener un array de objetos.
 * */
const findAll = async (collections) => {
  const connect = await ConnectionDB(collections);
  return await connect.find({}).toArray();
};

/**
 * Metodo que obtiene un registro por su identificador.
 * @param collections nombre de la coleccion (tabla o documento).
 * @param id identificador del registro a buscar.
 * @return un objeto o un null en dado caso de no encontrarlo.
 *
 */
const findById = async (collections, id) => {
  const connect = await ConnectionDB(collections);
  return await connect.findOne({ _id: new ObjectId(id) });
};

/**
 * Metodo que crear un nuevo registro.
 * @param collections nombre de la coleccion (tabla o documento).
 * @param data datos del modelo para crear dicho registro.
 * @return returna el registro con su identificador.
 *
 * */
const save = async (collections, data) => {
  const connect = await ConnectionDB(collections);
  return await data.save();
};

/**
 * Metodo que actualiza un registro o documento mediante un identificador.
 * @param collections nombre de la coleccion (tabla o documento)
 * @param id identificador del documento o registro.
 * @param data los datos del modelo actualizados.
 * @return registro actualizado exitosamente.
 *
 * */
const saveU = async (collections, id, data) => {
  const connect = await ConnectionDB(collections);
  return await connect.updateOne({ _id: new ObjectId(id) }, data);
};

/**
 * Metodo que elimina un registro o documento mediante su identificador.
 * @param collections nombre de la coleccion (table o documento).
 * @param id identificador del registro o documento.
 * @return retorna un objeto de estatus de la eliminacion.
 * */
const deleteId = async (collections, id) => {
  const connect = await ConnectionDB(collections);
  return await connect.deleteOne({ _id: new ObjectId(id) });
};

/**
 * Metodo que realiza una busqued con un schema que tiene un union de datos.
 * @param collections tabla principal.
 * @param model Modelo creado en la carpeta de modeles que corresponde.
 * @param localField atributo dentro de la coleccion que contiene el valor a relacionar.
 * @param foreignField atributo que realizana la coleccion a relacionar como si fuera un consulta sql.
 * @param alias como se mostrara el atributo dentro del objeto json de respuesa.
 * @param table segunda para lara unir en la consulta.
 *
 * @return coleccion de datos con una union.
 * */
const findAllJoin = async (
  collections,
  model,
  localField,
  foreignField,
  alias,
  table,
) => {
  const connect = await ConnectionDB(collections);
  let result = await model.aggregate([
    {
      $lookup: {
        from: table,
        localField: localField,
        foreignField: foreignField,
        as: alias,
      },
    },
    { $unwind: `$${alias}` },
  ]);
  return result;
};

/**
 * Metodo que busca en una coleccion de datos mediante el id en una tabla unida.
 * @param collections tabla principal.
 * @param model Modelo creado en la carpeta de modeles que corresponde.
 * @param localField atributo dentro de la coleccion que contiene el valor a relacionar.
 * @param foreignField atributo que realizana la coleccion a relacionar como si fuera un consulta sql.
 * @param alias como se mostrara el atributo dentro del objeto json de respuesa.
 * @param id identificador de la coleccion.
 * @param table segunda para lara unir en la consulta.
 * @return retorna una coleccion de datos.
 */
const findByIdJoin = async (
  collections,
  model,
  localField,
  foreignField,
  alias,
  id,
  table,
) => {
  let connect = await ConnectionDB(collections);
  let result = await model.aggregate([
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: table,
        localField: localField,
        foreignField: foreignField,
        as: alias,
      },
    },
    { $unwind: `$${alias}` },
  ]);
  return result;
};

/**
 * Metodo obtiene el numero de registros dentro del documento,
 * Nos ayudara para crear un autoincrementable.
 * @param dollections nombre de la coleccion o documento creado en mongo.
 * @return el ultimo registo almacenado.
 * */
const indice = async (collections) => {
  let connect = await ConnectionDB(collections);
  return await connect.count();
};

/**
 * Metodo para crear la authentication de un usuario dentro de la coleccion.
 * @param collections tabla o documento donde se encuentra.
 * @param email correo electronico como parametro de busqueda.
 * @return usuario registrado o null o undefined.
 * */
const authentication = async (collections, email) => {
  let connect = await ConnectionDB(collections);
  return await connect.findOne({ email: email });
};

// seccion donde colocamos y esportamos los metodos o funciones que tenemos
// aregada para poderlas ocupar.
module.exports.Crud = {
  findAll,
  findAllJoin,
  findByIdJoin,
  findById,
  save,
  saveU,
  deleteId,
  indice,
  authentication,
};
