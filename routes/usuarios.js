const { Router } = require('express');
const { check } = require('express-validator');

//* validations
const { validarCampos } = require('../middlewares/validarCampos');
const {
  validateRol,
  verificarExisteEmail,
  verificarExisteUsuarioId,
} = require('../helpers/dbValidators');

//* controllers
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('passwd', 'El password debe ser de mñas de 6 caracteres.').isLength({
      min: 6,
    }),
    check('correo', 'El correo no es valido').trim().isEmail(),
    check('correo').custom(verificarExisteEmail),
    check('role').custom(validateRol),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  '/:id',
  [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(verificarExisteUsuarioId),
    check('role').custom(validateRol),
    validarCampos,
  ],
  usuariosPut
);

router.patch('/', usuariosPatch);

router.delete(
  '/:id',
  [
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(verificarExisteUsuarioId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
