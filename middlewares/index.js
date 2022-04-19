const validarCampos = require('../middlewares/validar-campos.middleware');
const validarJWT = require("../middlewares/validar-jwt.middleware");
const validarRoles = require("../middlewares/validar-roles.middleware");

// relativamente se podriaan exportar asi pero no sirvi
module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
};
