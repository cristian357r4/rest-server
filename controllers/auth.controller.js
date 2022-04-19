 const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
 const {generarJWT} = require("../helpers/generar-jwt.helper");

const login = async (req, res = response) => {

    const {correo, password} = req.body;
    try{
        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo no existe'
            });
        }
        // Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error hable con el administrador',
        })
    }
};

module.exports = {
    login
};