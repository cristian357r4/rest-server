/*
{
//// ejemplo de la collection
    nombre: 'cristian',
    correo: 'corroe@correo.com',
    password: 'l;askndilkuh293',
    img: 'asdjhasdo',
    role: 'USER_ROLE',
    estado: false,
    google: false
}
*/
const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    correo: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
// Podemos sobreescribir metodos de la clase Schema
UsuarioSchema.methods.toJSON = function() {// aqui debe ser una cuncion normal por que hara referencia al a instancia creada
    const {__v , password, _id, ...usuario} = this.toObject();
    /* mi solucion
    const visualizar = {
        ...usuario,
        uid: _id
    }*/
    // solucion correcta
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);