const express = require('express');
const router = express.Router();
const {
    getDetalles,
    getDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle
} = require('../Controllers/detallesPedidoController');

router.get('/', getDetalles);
router.get('/:id', getDetalleById);
router.post('/', createDetalle);
router.put('/:id', updateDetalle);
router.delete('/:id', deleteDetalle);
module.exports = router;
