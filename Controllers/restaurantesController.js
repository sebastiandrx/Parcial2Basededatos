const pool = require('../db');

// Obtener todos los restaurantes
const getRestaurantes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM restaurante');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener restaurante por ID
const getRestauranteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM restaurante WHERE id_rest = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo restaurante
const createRestaurante = async (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await pool.query(
            'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)',
            [id_rest, nombre, ciudad, direccion, fecha_apertura]
        );
        res.status(201).json({ message: 'Restaurante creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar restaurante
const updateRestaurante = async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await pool.query(
            'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5',
            [nombre, ciudad, direccion, fecha_apertura, id]
        );
        res.json({ message: 'Restaurante actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar restaurante
const deleteRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM restaurante WHERE id_rest = $1', [id]);
        res.json({ message: 'Restaurante eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRestaurantes,
    getRestauranteById,
    createRestaurante,
    updateRestaurante,
    deleteRestaurante
};
