const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Estructura o esquema de datos que se van a crear en
 * la base de datos NOSQL mongodb, asi validando cada uno
 * de los atributos.
 * */

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apaterno: { type: String, required: true },
    amaterno: { type: String, required: false },
    rfc: { type: String, required: false },
    estatus: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("clientes", clienteSchema);
