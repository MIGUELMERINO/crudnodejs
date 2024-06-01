const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Estructura o esquema de datos que se van a crear en 
 * la base de datos NOSQL mongodb, asi validando cada uno 
 * de los atributos.
 * */

const usuarioSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, uniqued: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apaterno: { type: String, required: true },
    amaterno: { type: String, required: false },
    activo: { type: Number, required: true },
    perfil: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("usuarios", usuarioSchema);
