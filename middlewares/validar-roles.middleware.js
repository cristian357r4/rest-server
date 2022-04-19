const { response } = require('express');

const esAdminRole = (req, res = response, next ) => {
    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se queire verificar el rol sin antes validar el token'
        });
    }

    const { role, nombre } = req.usuario;
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador y no puede hacer eso`
        });
    }
    next();
};

const tieneRole= ( ...roles ) => {
    return (req, res = response, next ) => {
        //console.log(roles, req.usuario.role);

        if ( !req.usuario ){
            return res.status(500).json({
                msg: 'Se queire verificar el rol sin antes validar el token'
            });
        }

        // mejora: comprobar que los roles definidos enviados existan en la base de datos
        if ( !roles.includes( req.usuario.role )){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
        }

        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole
};