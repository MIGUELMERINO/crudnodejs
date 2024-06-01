const { ClienteService } = require("../service/clienteService");
const debug = require("debug")("app");
const createError = require("http-errors");
const { Response } = require("../utils/Response");
const { Utils } = require("../utils/utils");

// Controlador que dara la funcionalidad de crear, editar, actulizar y eliminar datos especificamente
// de un catalogo clientes.

module.exports.ClienteController = {
  clientes: async (req, res) => {
    try {
      let clientes = await ClienteService.findAll();
      Response.responseGeneral(res, 200, "Lista de clientes", clientes);
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
  cliente: async (req, res) => {
    try {
      let cliente = await ClienteService.findById(Utils.clave(req));
      if (!cliente) {
        Response.responseGeneral(res, 200, "Cliente no encontrado");
      } else {
        Response.responseGeneral(res, 200, "Cliente", cliente);
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
  clienteC: async (req, res) => {
    try {
      if (Utils.validBody(Utils.payload(req))) {
        Response.responseGeneral(res, 400, new createError.BadRequest());
      } else {
        const cliente = await ClienteService.save(Utils.payload(req));
        Response.responseGeneral(res, 201, "Cliente creado", cliente);
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
  clienteU: async (req, res) => {
    try {
      if (Utils.validBody(Utils.payload(req))) {
        Response.responseGeneral(res, 500, new createError.BadRequest());
      } else {
        await ClienteService.update(Utils.clave(req), Utils.payload(req));
        Response.responseGeneral(res, 201, "Se actualiza el usuario");
      }
    } catch (e) {
      debug(e);
      Response.responseGeneral(res, 500);
    }
  },
  ClienteD: async (req, res) => {
    try {
      await ClienteService.deleteId(Utils.clave(req));
      Response.responseGeneral(res, 200, "Cliente eliminado");
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, 500);
    }
  },
};
