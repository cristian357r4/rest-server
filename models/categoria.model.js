const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',// esta es la referencia a Usuario de usuario.model module.exports = model('Usuario', UsuarioSchema);
        required: true
    }
});

module.exports = model('Categoria', CategoriaSchema);