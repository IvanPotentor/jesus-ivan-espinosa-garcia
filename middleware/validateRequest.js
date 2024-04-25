const validateRequest = (schema) => (req, res, next) => {
    // Configura opciones para el proceso de validación.
    const options = {
        abortEarly: false,  // No detiene la validación al primer error; recoge todos los errores.
        allowUnknown: true,  // Permite propiedades desconocidas en los datos de entrada.
        stripUnknown: true   // Elimina las propiedades desconocidas de los datos de entrada.
    };

    // Valida los datos del cuerpo de la solicitud contra el esquema proporcionado.
    const { error, value } = schema.validate(req.body, options);

    // Verifica si ocurrieron errores durante la validación.
    if (error) {
        // Construye un mensaje de error combinando todos los mensajes de error de detalle.
        const errorMessage = error.details.map(detail => detail.message).join(", ");

        // Retorna una respuesta con estado HTTP 400 (Bad Request) con los detalles del error.
        return res.status(400).json({ error: errorMessage });
    } else {
        // Si no hay errores, asigna los datos validados y formateados al cuerpo de la solicitud.
        req.body = value;
        next();  // Pasa el control al siguiente middleware o controlador.
    }
};

module.exports = validateRequest;
