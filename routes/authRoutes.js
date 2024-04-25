// Importación de módulos necesarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerSchema } = require('../validation/userValidation');
const validateRequest = require('../middleware/validateRequest');

// Configuración de las rutas de autenticación utilizando Express Router

// Ruta POST para el registro de usuarios.
// Utiliza validateRequest middleware para validar los datos según registerSchema antes de pasar al controlador.
router.post('/register', validateRequest(registerSchema), authController.register);

// Ruta POST para el inicio de sesión de usuarios.
// No se aplica validación de esquema en esta ruta; la validación específica se maneja en el controlador.
router.post('/login', authController.login); // Ejemplo de ruta de inicio de sesión

// Exporta el router configurado para su uso en otras partes de la aplicación.
module.exports = router;
