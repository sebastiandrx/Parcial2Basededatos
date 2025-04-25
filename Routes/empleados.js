const express = require('express');
const router = express.Router();
const {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} = require('../Controllers/empleadosController');

router.get('/', getEmpleados);
router.get('/:id', getEmpleadoById);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

module.exports = router;
