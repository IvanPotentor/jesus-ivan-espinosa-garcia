const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Asegúrate de que la ruta al modelo es correcta
const AccessToken = require('../models/accessToken');

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @param {Object} req - Objeto de solicitud de Express que contiene la información de la solicitud.
 * @param {Object} res - Objeto de respuesta de Express que se utilizará para devolver la respuesta.
 */
exports.register = async (req, res) => {
    try {
        // Extracción de datos del cuerpo de la solicitud.
        const { name, phone, img_profile, password } = req.body;

        // Hashing de la contraseña proporcionada con bcrypt.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creación de una nueva instancia del modelo User.
        const newUser = new User({
            name,
            phone,
            img_profile,
            password: hashedPassword
        });

        // Guardando el nuevo usuario en la base de datos.
        await newUser.save();

        // Enviando una respuesta de éxito.
        res.status(201).send('User registered successfully');
    } catch (error) {
        // Manejo de errores, enviando una respuesta de error.
        res.status(500).json({ message: error.message });
    }
};

/**
 * Autentica a un usuario y devuelve un token JWT si las credenciales son válidas.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.login = async (req, res) => {
    try {
        // Extracción de credenciales del cuerpo de la solicitud.
        const { phone, password } = req.body;

        // Búsqueda del usuario por número de teléfono.
        const user = await User.findOne({ phone });

        // Verificación de la existencia del usuario.
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparación de la contraseña proporcionada con la almacenada.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generación del token JWT.
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Creación y guardado de un nuevo token de acceso en la base de datos.
        const newAccessToken = new AccessToken({
            user_id: user._id,
            token: token,
            expires: new Date(Date.now() + 3600000) // Expira en 1 hora
        });

        await newAccessToken.save();

        // Envío del token al cliente.
        res.json({ token });
    } catch (error) {
        // Manejo de errores, enviando una respuesta de error.
        res.status(500).json({ message: error.message });
    }
};
