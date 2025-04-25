const express = require('express');
const router = express.Router();
const {
    getProductosDePedido,
    getProductosMasVendidos,
    getTotalVentasPorRestaurante,
    getPedidosPorFecha,
    getEmpleadosPorRol
} = require('../Controllers/consultasController');

router.get('/productos-pedido/:id', getProductosDePedido);
router.get('/mas-vendidos/:cantidad', getProductosMasVendidos);
router.get('/ventas-restaurante', getTotalVentasPorRestaurante);
router.get('/pedidos-fecha/:fecha', getPedidosPorFecha);
router.get('/empleados-por-rol/:id/:rol', getEmpleadosPorRol);

module.exports = router;
