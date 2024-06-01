const { ProductoService } = require('../service/productoService');
const debug = require('debug')('app');
const createError = require('http-errors');
const { Response } = require('../utils/Response');
const { Utils } = require('../utils/utils');

// Controlador que dara la funcionalidad de crear, editar, actulizar y eliminar datos especificamente 
// de un catalogo de productos.

module.exports.ProductoController = {
    productos: async (req, res) => {
        try {
            let productos = await ProductoService.findAll();
            Response.responseGeneral(res, 200, 'Lista Productos', productos);
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    producto: async (req, res) => {
        try {
            let producto = await ProductoService.findById(Utils.clave(req));
            if (!producto) {
                Response.responseGeneral(res, 200, 'Producto no encontrado');
            } else {
                Response.responseGeneral(res, 200, 'Producto', producto);
            }
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    productoC: async (req, res) => {
        try {
            if (Utils.validBody(Utils.payload(req))) {
                Response.responseGeneral(res, 400, new createError.BadRequest());
            } else {
                const producto = await ProductoService.save(Utils.payload(req));
                Response.responseGeneral(res, 201, 'Producto creado', producto);
            } 
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    productoU: async (req, res) => {
        try {
            if (Utils.validBody(Utils.payload(req))) {
                Response.responseGeneral(res, 400, new createError.BadRequest());
            } else {
                await ProductoService.update(Utils.clave(req), Utils.payload(req));
                Response.responseGeneral(res, 200, 'Producto actualizado');
            }
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    productoD: async (req, res) => {
        try {
            await ProductoService.deleteId(Utils.clave(req));
            Response.responseGeneral(res, 200, 'Producto eliminado');
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },

}



