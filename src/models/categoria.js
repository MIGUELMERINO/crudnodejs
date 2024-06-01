const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Estructura o esquema de datos que se van a crear en
 * la base de datos NOSQL mongodb, asi validando cada uno
 * de los atributos.
 * */

const categoriaSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estatus: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("categorias", categoriaSchema);
