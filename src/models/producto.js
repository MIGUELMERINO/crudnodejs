const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Estructura o esquema de datos que se van a crear en
 * la base de datos NOSQL mongodb, asi validando cada uno
 * de los atributos.
 * */

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    cantida: { type: Number, required: true },
    estatus: { type: Number, required: true },
    id_categoria: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("productos", productoSchema);
