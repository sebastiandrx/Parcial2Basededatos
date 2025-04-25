const pool = require('../db');

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedido');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener pedido por ID
const getPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo pedido
const createPedido = async (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;
    try {
        await pool.query(
            'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)',
            [id_pedido, fecha, id_rest, total]
        );
        res.status(201).json({ message: 'Pedido creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar pedido
const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    try {
        await pool.query(
            'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4',
            [fecha, id_rest, total, id]
        );
        res.json({ message: 'Pedido actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar pedido
const deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM pedido WHERE id_pedido = $1', [id]);
        res.json({ message: 'Pedido eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
};
