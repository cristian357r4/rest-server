const {Router} = require('express');
const {check} = require('express-validator');

// const {validarCampos} = require('../middlewares/validar-campos.middleware');
// const {validarJWT} = require("../middlewares/validar-jwt.middleware");
// const { esAdminRole, tieneRole } = require("../middlewares/validar-roles.middleware");

// este require lee el index.js de la carpeta middlewares
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const {isValidRole, correoExist, existeUsuarioById} = require("../helpers/db-validators.helper");

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuario.controller');

const router = Router();

// se pasa la referencia de la funcion
router.get('/', usuariosGet);
// no es que se ejecute la funcion el request, response son pasado a getUsuarios,

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioById),
    check('role').custom( isValidRole ),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6, max: 10}),
    check('correo', 'El correo no es valido').isEmail(),// va preparando el response si hayh errores previos para que no se ejecute la funcion
    check('correo', 'El correo ya existe').custom(correoExist),
    //check('role').custom( ((role) => isValidRole(role)) ),
    check('role').custom( isValidRole ),
    validarCampos
], usuariosPost);
// NOTE: los middlewares se ejecutan de forma secuencial por eso es importante que validarJWT sea el primero
router.delete('/:id', [
    validarJWT,
    //esAdminRole, obliga a que el usuario sea admin
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),// comprueba al usuario que hace la peticion tenga alguno de estos roles
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;