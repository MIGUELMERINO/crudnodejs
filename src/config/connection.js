const mongoose = require('mongoose');
const debug = require('debug')('app');
const { Config } = require('./config.js');

var connections = null;

/**
 * Metodo o funcion que realiza la conexion a una base de datos NOSQL en este caso mongodb
 * @param collections nombre del documento (Nombre de la tabla.) a la que se conectara.
 * @return retorna una promesa de conexion existo a dicha collection o tabla.
 * */
module.exports.ConnectionDB  = (collections) => new Promise(async (res, rej) => {
    try {
        if (!connections) {
            connections = await mongoose.connect(
               `${Config.url}/${Config.db}`, {},
            );
        }
        debug('Conexion exitosa');
        res(connections.connection.db.collection(collections));
    }catch(error) {
        debug(error);
    }
});
