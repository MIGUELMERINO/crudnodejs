const { UsuarioService } = require("../service/usuarioService");
const debug = require("debug")("app");
const createError = require("http-errors");
const { Response } = require("../utils/Response");
const { Utils } = require("../utils/utils");

// Controlador que dara la funcionalidad de crear, editar, actulizar y eliminar datos especificamente
// de un catalogo de usuarios.

module.exports.UsuarioController = {
  usuarios: async (req, res) => {
    try {
      let usuarios = await UsuarioService.findAll();
      Response.responseGeneral(res, 200, "Lista de usuarios", usuarios);
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, ({ statusCode } = error));
    }
  },
  usuario: async (req, res) => {
    try {
      let usuario = await UsuarioService.findById(Utils.clave(req));
      if (!usuario) {
        Response.responseGeneral(res, 200, "Usuario no encontrado");
      } else {
        Response.responseGeneral(res, 200, "Usuario", usuario);
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, ({ statusCode } = error));
    }
  },
  usuarioC: async (req, res) => {
    try {
      if (Utils.validBody(Utils.payload(req))) {
        Response.responseGeneral(
          res,
          ({ statusCode } = req),
          new createError.BadRequest(),
        );
      } else {
        const usuario = await UsuarioService.save(Utils.payload(req));
        Response.responseGeneral(res, 201, "Usuario creado", usuario);
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, ({ statusCode } = error));
    }
  },
  usuarioU: async (req, res) => {
    try {
      if (Utils.validBody(Utils.payload(req))) {
        Response.responseGeneralr(
          res,
          ({ statusCode } = req),
          new createError.BadRequest(),
        );
      } else {
        await UsuarioService.update(Utils.clave(req), Utils.payload(req));
        Response.responseGeneral(res, 201, "Usuario actualizado");
      }
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, ({ statusCode } = error));
    }
  },
  usuarioD: async (req, res) => {
    try {
      await UsuarioService.deleteId(Utils.clave(req));
      Response.responseGeneral(res, 200, "Usuario Eliminado");
    } catch (error) {
      debug(error);
      Response.responseGeneral(res, ({ statusCode } = error));
    }
  },
};
