const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const usuariosGet = async (req = request, res = response) => {
    //const {q, nombre = 'no definido', apikey, page = 10, limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    // WARNING exite un problema qcon lo await ya que son codigo bloqueante termina el primer away para poder continuar con el segundo
    // Por eso se introdujeron a la promesa para que ambos se ejecuten o terminen a la vez
    const [total, usuarios ]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        role
    });
    // previo al save se deberia verificar si el correo existe

    //const exiteEmail = await Usuario.findOne({ correo: correo });// verifica si el correop existe pero como el parametro es redundante solo se manda el parametro sin alias
    /*
    const exiteEmail = await Usuario.findOne({correo});

    if (exiteEmail) {
        return res.status(400).json({
            ok: false,
            message: 'El correo ya existe'
        });
    }
     */

    // Encryptar la contraseña
    const salt = bcryptjs.genSaltSync();// genera un numero aleatorio el parametro es la cantidad de veces que se va a encriptar por defecto es 10
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la base de datos
    await usuario.save();
    res.json({
        usuario
    });
};

const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;
    //TODO validar contra la base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();// genera un numero aleatorio el parametro es la cantidad de veces que se va a encriptar por defecto es 10
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); // Este metodo permite actualizar todos los campos que se le pasen en el objeto

    res.json({
        usuario
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const { uid } = req.uid; // uid es una var que se definio en validar-jwt.js
    console.log(uid);

    // Warrning poara borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        usuarioAutenticado
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};