const bcrypt = require('bcryptjs');
const { findByIdAndUpdate } = require('../models/usuario');

//* models
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, passwd, role } = req.body;
  const usuario = new Usuario({ nombre, correo, passwd, role });

  //* hash passwd
  const salt = bcrypt.genSaltSync(10);
  usuario.passwd = bcrypt.hashSync(passwd, salt);

  //* Guardar en db
  await usuario.save();

  res.json(usuario);
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, passwd, google, correo, ...rest } = req.body;

  if (passwd) {
    //* hash passwd
    const salt = bcrypt.genSaltSync(10);
    rest.passwd = bcrypt.hashSync(passwd, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

  res.json(usuario);
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - controlador',
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  );
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
