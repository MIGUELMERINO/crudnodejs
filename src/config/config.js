require('dotenv').config();

/**
 * Archivo de confuguracion el cual exporta al todo el proyecto
 * las configuraciones almencenadas en un archivo .env para mantenerlas
 * como variables de entorno.
 * */
module.exports.Config = {
    port: process.env.PORT,
    url: process.env.MONGO_URL,
    db: process.env.MONGO_DBNAME,
    api: process.env.API,
    secret: process.env.SECRET,
}
