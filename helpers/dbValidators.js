const Role = require('../models/role');
const Usuario = require('../models/usuario');

//* verifica si el rol del usuario corresponde con los reles en db
const validateRol = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role}, no es un rol valido`);
  }
};

//* verificar si el correo existe en db
const verificarExisteEmail = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo}, ya esta registrado`);
  }
};

//* verificar usuario por id
const verificarExisteUsuarioId = async (id = '') => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario no existe`);
  }
};

module.exports = {
  validateRol,
  verificarExisteEmail,
  verificarExisteUsuarioId,
};
