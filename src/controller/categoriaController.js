const { CategoriaService } = require('../service/categoriaService');
const debug = require('debug')('app');
const createError = require('http-errors');
const { Response } = require('../utils/Response');
const { Utils } = require('../utils/utils');

// Controlador que dara la funcionalidad de crear, editar, actulizar y eliminar datos especificamente 
// de un catalogo categoria.

module.exports.CategoriaController = {
    categorias: async (req, res) => {
        try {
            let categorias = await CategoriaService.findAll();
            Response.responseGeneral(res, 200, 'Lista de categorias', categorias);
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    categoria: async (req, res) => {
        try {
            let categoria = await CategoriaService.findById(Utils.clave(req));
            if (!categoria) {
                Response.responseGeneral(res, 200, 'Categoria no encontrada');
            } else {
                Response.responseGeneral(res, 200, 'Categoria', categoria);
            }
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    categoriaC: async (req, res) => {
        try {
            if (Utils.validBody(Utils.payload(req))) {
                Response.responseGeneral(res, 400, new createError.BadRequest());
            } else {
                const categoria = await CategoriaService.save(Utils.payload(req));
                Response.responseGeneral(res, 201, 'Categoria creada', categoria);
            }
        } catch(error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    categoriaU: async (req, res) => {
        try {
            if (Utils.validBody(Utils.payload(req))) {
                Response.responseGeneral(res, 400, new createError.BadRequest());
            } else {
                await CategoriaService.update(Utils.clave(req), Utils.payload(req));
                Response.responseGeneral(res, 201, 'Categoria actualizada');
            }
        } catch (error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },
    categoriaD: async (req, res) => {
        try {
            await CategoriaService.deleteId(Utils.clave(req));
            Response.responseGeneral(res, 200, 'Categoria eliminada');
        } catch (error) {
            debug(error);
            Response.responseGeneral(res, 500);
        }
    },

}

