const express = require('express');
const productController = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT');
const validateRequest = require('../middleware/validateRequest');
const { productSchema, batchProductSchema, batchProductSchemaI } = require('../validation/productValidation');

const router = express.Router();

// Utiliza authenticateJWT para proteger todas las rutas.
// Esto asegura que todas las rutas requieran un token JWT válido para acceso.
router.use(authenticateJWT);

// Aplica validación en las rutas que crean o actualizan datos.
// Utiliza diferentes esquemas de validación según la ruta y la acción.

// Ruta para crear un producto individual.
router.post('/', validateRequest(productSchema), productController.createProduct);

// Ruta para crear múltiples productos a la vez.
router.post('/batch', validateRequest(batchProductSchemaI), productController.createMultipleProducts);

// Ruta para actualizar un producto específico por ID.
router.put('/:id', validateRequest(productSchema), productController.updateProduct);

// Ruta para actualizar múltiples productos a la vez.
router.put('/batch', validateRequest(batchProductSchema), productController.updateMultipleProducts);

// Rutas que no requieren validación adicional.
// Estas rutas permiten la recuperación y eliminación de productos.

// Ruta para obtener todos los productos.
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto por su ID.
router.get('/:id', productController.getProductById);

// Ruta para eliminar un producto por su ID.
router.delete('/:id', productController.deleteProduct);

// Ruta para eliminar múltiples productos a la vez.
router.delete('/batch', productController.deleteMultipleProducts);

module.exports = router;
