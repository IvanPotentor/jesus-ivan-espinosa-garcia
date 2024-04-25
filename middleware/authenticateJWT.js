const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación que verifica el token JWT proporcionado en el encabezado de autorización.
 * Este middleware es utilizado para proteger rutas restringiendo el acceso solo a solicitudes válidas y autenticadas.
 *
 * @param {Object} req - Objeto de solicitud de Express, que incluye la información de la solicitud.
 * @param {Object} res - Objeto de respuesta de Express que se utiliza para enviar respuestas al cliente.
 * @param {Function} next - Función de callback que se llama para pasar el control al siguiente middleware.
 */
const authenticateJWT = (req, res, next) => {
    // Obtiene el encabezado de autorización de la solicitud entrante.
    const authHeader = req.headers.authorization;
    
    // Verifica si el encabezado de autorización está presente.
    if (authHeader) {
        // Extrae el token del encabezado. Espera un formato "Bearer <token>".
        const token = authHeader.split(' ')[1];

        // Verifica el token usando la clave secreta almacenada en las variables de entorno.
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            // Maneja el caso donde el token no es válido o ha expirado.
            if (err) {
                // Envía una respuesta de estado 403 Forbidden si hay un error al verificar el token.
                return res.sendStatus(403);
            }

            // Añade los datos decodificados del token al objeto de solicitud para uso en otros middlewares o controladores.
            req.user = decoded;
            next();  // Continúa con el siguiente middleware en la cadena.
        });
    } else {
        // Envía una respuesta de estado 401 Unauthorized si no se proporciona un encabezado de autorización.
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
