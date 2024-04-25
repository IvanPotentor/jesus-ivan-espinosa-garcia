const Joi = require('joi');

// Esquema para la validación de datos de un producto individual.
const productSchema = Joi.object({
    name: Joi.string().required().trim().min(3).max(255),  // Nombre del producto, requerido, con longitud controlada.
    description: Joi.string().required().trim().min(5).max(1024),  // Descripción del producto, requerida, con longitud controlada.
    height: Joi.number().required().positive(),  // Altura del producto, requerida, debe ser un número positivo.
    length: Joi.number().required().positive(),  // Longitud del producto, requerida, debe ser un número positivo.
    width: Joi.number().required().positive()  // Ancho del producto, requerido, debe ser un número positivo.
});

// Esquema para la validación de una lista de productos en operaciones batch.
const batchProductSchemaI = Joi.object({
    products: Joi.array().items(productSchema).min(1)  // Asegura que se incluya al menos un producto en el batch.
});

// Esquema para la validación de actualizaciones de productos en operaciones batch.
const batchProductSchema = Joi.object({
    updates: Joi.array().items(
        Joi.object({
            id: Joi.string().required(),  // ID del producto a actualizar, requerido.
            updateFields: Joi.object({  // Especifica los campos del producto que pueden ser actualizados.
                name: Joi.string(),  // Nombre del producto, opcional en la actualización.
                description: Joi.string(),  // Descripción del producto, opcional en la actualización.
                height: Joi.number().min(1),  // Altura del producto, opcional, con un mínimo establecido.
                length: Joi.number().min(1),  // Longitud del producto, opcional, con un mínimo establecido.
                width: Joi.number().min(1)  // Ancho del producto, opcional, con un mínimo establecido.
            }).required()  // Los campos de actualización son requeridos aunque el contenido específico sea opcional.
        })
    ).min(1)  // Asegura que haya al menos una actualización en el batch.
});

module.exports = { productSchema, batchProductSchema, batchProductSchemaI };
