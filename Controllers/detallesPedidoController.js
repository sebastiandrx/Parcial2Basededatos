const pool = require('../db');

// Obtener todos los detalles
const getDetalles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM detallepedido');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener detalle por ID
const getDetalleById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM detallepedido WHERE id_detalle = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo detalle
const createDetalle = async (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        await pool.query(
            'INSERT INTO detallepedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)',
            [id_detalle, id_pedido, id_prod, cantidad, subtotal]
        );
        res.status(201).json({ message: 'Detalle creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar detalle
const updateDetalle = async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    try {
        await pool.query(
            'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5',
            [id_pedido, id_prod, cantidad, subtotal, id]
        );
        res.json({ message: 'Detalle actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar detalle
const deleteDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM detallepedido WHERE id_detalle = $1', [id]);
        res.json({ message: 'Detalle eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getDetalles,
    getDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle
};
