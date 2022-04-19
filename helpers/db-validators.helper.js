const Role = require("../models/role.model");
const User = require("../models/usuario.model");
const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El rol: ${ role } no existe`);
    }
};

const correoExist = async (correo= '') => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email: ${ correo } ya existe`);
    }
}

const existeUsuarioById = async (id= '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe el usuario`);
    }
}

module.exports = {
    isValidRole,
    correoExist,
    existeUsuarioById
};