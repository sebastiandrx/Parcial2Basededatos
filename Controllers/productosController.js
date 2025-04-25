const pool = require('../db');

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM producto');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener producto por ID
const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM producto WHERE id_prod = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo producto
const createProducto = async (req, res) => {
    const { id_prod, nombre, precio } = req.body;
    try {
        await pool.query(
            'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3)',
            [id_prod, nombre, precio]
        );
        res.status(201).json({ message: 'Producto creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar producto
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
        await pool.query(
            'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3',
            [nombre, precio, id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM producto WHERE id_prod = $1', [id]);
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
