// Carga variables de entorno desde .env al entorno de la aplicación.
require('dotenv').config();

// Importación de módulos necesarios.
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Creación de una aplicación Express.
const app = express();
const PORT = process.env.PORT || 3000;  // Definición del puerto de escucha del servidor.

// Middleware para parsear cuerpos JSON en las solicitudes entrantes.
app.use(express.json());

// Establecimiento de la conexión a MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/tendency', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))  // Confirma conexión exitosa.
.catch(err => console.error('Could not connect to MongoDB', err));  // Maneja errores de conexión.

// Registro de rutas.
app.use('/api/products', productRoutes);  // Rutas para la gestión de productos.
app.use('/api/auth', authRoutes);  // Rutas para la autenticación de usuarios.

// Manejo de errores genéricos.
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log del error.
    res.status(500).send('Something broke!');  // Envío de respuesta de error genérico.
});

// Inicio del servidor en el puerto especificado.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Exportación de la instancia de la aplicación para pruebas u otros usos.
module.exports = app;
