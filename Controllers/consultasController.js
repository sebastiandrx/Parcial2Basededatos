const pool = require('../db');

const getProductosDePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.nombre, dp.cantidad, dp.subtotal
            FROM detallepedido dp
            JOIN producto p ON dp.id_prod = p.id_prod
            WHERE dp.id_pedido = $1`, [id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getProductosMasVendidos = async (req, res) => {
    const { cantidad } = req.params;
    try {
        const result = await pool.query(
            `SELECT p.nombre, SUM(dp.cantidad) AS total_vendido
            FROM detallepedido dp
            JOIN producto p ON dp.id_prod = p.id_prod
            GROUP BY p.nombre
            HAVING SUM(dp.cantidad) > $1`, [cantidad]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTotalVentasPorRestaurante = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT r.nombre, SUM(p.total) AS total_ventas
            FROM pedido p
            JOIN restaurante r ON p.id_rest = r.id_rest
            GROUP BY r.nombre`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPedidosPorFecha = async (req, res) => {
    const { fecha } = req.params;
    try {
        const result = await pool.query(
            `SELECT * FROM pedido WHERE fecha = $1`, [fecha]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getEmpleadosPorRol = async (req, res) => {
    const { id, rol } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM empleado WHERE id_rest = $1 AND rol = $2',
            [id, rol]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener empleados por rol:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};




module.exports = {
    getProductosDePedido,
    getProductosMasVendidos,
    getTotalVentasPorRestaurante,
    getPedidosPorFecha,
    getEmpleadosPorRol
};
