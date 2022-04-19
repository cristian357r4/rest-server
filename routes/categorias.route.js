const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require("../middlewares/validar-campos.middleware");

const router = Router();
/*
localhost:8080/api/ctaegorias
 */
// Obtener todas las categorias
router.get('/', (req, res) => {
    res.json({
        mensaje: 'Todo esta bien'
    });
});

// Obtener una categoria por Id
router.get( '/:id', (req, res) => {
    res.json({
        mensaje: 'get - id'
    });
});

// Crear una categoria - privado -  cualquier persona con un toke valido
router.post('/', (req, res) => {
    res.json({
        mensaje: 'post'
    });
});

// Actualizar una categoria - privado - cualquier persona con un toke valido
router.put('/:id', (req, res) => {
    res.json({
        mensaje: 'put'
    });
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json({
        mensaje: 'delete'
    });
});

module.exports = router;
