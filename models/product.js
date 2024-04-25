const mongoose = require('mongoose');

// Define el esquema para el modelo Product.
const productSchema = new mongoose.Schema({
    // Campo name que almacena el nombre del producto.
    name: {
        type: String,  // Tipo de dato cadena.
        required: true,  // Este campo es obligatorio.
        trim: true  // Elimina los espacios en blanco al principio y al final del valor.
    },
    // Campo description que almacena una descripción del producto.
    description: {
        type: String,  // Tipo de dato cadena.
        required: true,  // Este campo es obligatorio.
        trim: true  // Elimina los espacios en blanco al principio y al final del valor.
    },
    // Campo height que almacena la altura del producto.
    height: {
        type: Number,  // Tipo de dato número.
        required: true  // Este campo es obligatorio.
    },
    // Campo length que almacena la longitud del producto.
    length: {
        type: Number,  // Tipo de dato número.
        required: true  // Este campo es obligatorio.
    },
    // Campo width que almacena el ancho del producto.
    width: {
        type: Number,  // Tipo de dato número.
        required: true  // Este campo es obligatorio.
    }
}, { collection: 'catalog_products' });  // Especifica el nombre de la colección en MongoDB.

// Crea un modelo a partir del esquema definido.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
