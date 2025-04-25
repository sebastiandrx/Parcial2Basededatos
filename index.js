const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
const PORT = 3000;


const restauranteRoutes = require('./Routes/restaurantes.js');
app.use('/restaurantes', restauranteRoutes);

const empleadoRoutes = require('./Routes/empleados.js');
app.use('/empleados', empleadoRoutes);

const productoRoutes = require('./Routes/productos.js');
app.use('/productos', productoRoutes);

const pedidoRoutes = require('./Routes/pedidos.js');
app.use('/pedidos', pedidoRoutes);

const detalleRoutes = require('./Routes/detallesPedido.js');
app.use('/detalles', detalleRoutes);


//ConsultasNativas
const consultasRoutes = require('./Routes/consultas.js');
app.use('/consultas', consultasRoutes);



app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

