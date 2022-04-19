const {validationResult} = require("express-validator");

const validarCamposMiddleware = (req, res, next ) =>{ // si el middleware pasa aentonces se ejecuta el siguiente middleware por eso el next
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
};

module.exports = {
    validarCampos: validarCamposMiddleware
};