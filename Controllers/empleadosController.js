const pool = require('../db');

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM empleado');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener empleado por ID
const getEmpleadoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo empleado
const createEmpleado = async (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    try {
        await pool.query(
            'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)',
            [id_empleado, nombre, rol, id_rest]
        );
        res.status(201).json({ message: 'Empleado creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar empleado
const updateEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    try {
        await pool.query(
            'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4',
            [nombre, rol, id_rest, id]
        );
        res.json({ message: 'Empleado actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar empleado
const deleteEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
        res.json({ message: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};
