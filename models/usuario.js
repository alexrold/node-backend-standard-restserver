const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio.'],
    unique: true,
  },
  passwd: {
    type: String,
    required: [true, 'La contraceña es obligatoria.'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, passwd, ...usuario } = this.toObject();
  return usuario;
};
module.exports = model('Usuario', UsuarioSchema);
