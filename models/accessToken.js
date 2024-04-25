const mongoose = require('mongoose');

// Define el esquema para el modelo AccessToken.
const accessTokenSchema = new mongoose.Schema({
    // Campo user_id que referencia a un documento en la colección 'User'.
    user_id: {
        type: mongoose.Schema.Types.ObjectId,  // Tipo ObjectId para referenciar otro documento.
        ref: 'User',  // Referencia al modelo 'User'.
        required: true  // Este campo es obligatorio.
    },
    // Campo token que almacena el token de acceso generado.
    token: {
        type: String,  // Tipo de dato cadena.
        required: true  // Este campo es obligatorio.
    },
    // Campo expires que indica la fecha de expiración del token.
    expires: {
        type: Date,  // Tipo de dato fecha.
        required: true  // Este campo es obligatorio.
    }
});

// Crea un modelo a partir del esquema definido.
const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
