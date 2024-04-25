const mongoose = require('mongoose');

// Define el esquema para el modelo User.
const userSchema = new mongoose.Schema({
    // Campo name que almacena el nombre del usuario.
    name: {
        type: String,  // Tipo de dato cadena.
        required: true,  // Este campo es obligatorio.
        trim: true  // Elimina los espacios en blanco al principio y al final del valor.
    },
    // Campo phone que almacena el número de teléfono del usuario.
    phone: {
        type: String,  // Tipo de dato cadena.
        required: true,  // Este campo es obligatorio.
        unique: true,  // Garantiza que cada número de teléfono sea único en la base de datos.
        trim: true  // Elimina los espacios en blanco al principio y al final del valor.
    },
    // Campo img_profile que almacena la URL de la imagen de perfil del usuario.
    img_profile: {
        type: String,  // Tipo de dato cadena.
        trim: true  // Elimina los espacios en blanco al principio y al final del valor, si los hay.
    },
    // Campo password que almacena la contraseña del usuario.
    password: {
        type: String,  // Tipo de dato cadena.
        required: true  // Este campo es obligatorio.
    }
});

// Crea un modelo a partir del esquema definido.
const User = mongoose.model('User', userSchema);

module.exports = User;
