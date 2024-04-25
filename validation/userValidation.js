const Joi = require('joi');

// Define un esquema para la validación de los datos de registro de usuarios.
const registerSchema = Joi.object({
    name: Joi.string().required().trim().min(3).max(255),  // Nombre del usuario, requerido, con longitud mínima y máxima.
    phone: Joi.string().required().pattern(new RegExp('^[0-9]{10}$')),  // Teléfono del usuario, requerido, debe ser un número de 10 dígitos.
    img_profile: Joi.string().uri().optional(),  // URL de la imagen de perfil, opcional, debe ser una URI válida.
    password: Joi.string().required().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),  // Contraseña, requerida, con requisitos mínimos de longitud y caracteres.
});

// Define un esquema para la validación de los datos de inicio de sesión de usuarios.
const loginSchema = Joi.object({
    username: Joi.string().required(),  // Nombre de usuario, requerido.
    password: Joi.string().required()  // Contraseña, requerida.
});

module.exports = { registerSchema, loginSchema };
