// para validar que el usuario que desee eliminar sea de algun tipo de rol que pueda eliminar
const jwt = require('jsonwebtoken');
const {response} = require("express");
const Usuario = require('../models/usuario.model');

const validarJWT = async ( req, res = response, next ) => {
    const token = req.header('x-token');
    //console.log(token);
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try{
       const { uid }=  jwt.verify( token, process.env.SECRET_PRIVATE_KEY );

       // Leer el usuario que corresponde al uid
       const usuario =  await Usuario.findById(uid);
       if( !usuario ){
           return res.status(401).json({
               msg: 'El usuario no existe que intenta hacer esa peticion no existe'
           });
       }
       if( !usuario.estado ){
           return res.status(401).json({
               msg: 'Token no valido- estado usuario false'
           });
       }

       req.usuario = usuario;




       req.uid = uid; // NOTA: todos los campos pasan por referencia asi que donde se usan los middlewares se pasan los mismos parametros a cada uno
                      // No se usa la variable uid por que se podria sobreescribir para eso se crea una nueva

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
};
