const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

const restauranteRoutes = require('./Routes/restaurantes.js');
app.use('/restaurantes', restauranteRoutes);
