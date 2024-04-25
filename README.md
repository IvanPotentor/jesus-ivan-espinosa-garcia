
# API de Gestión de Productos - Jesús Iván Espinosa García

Este proyecto implementa un backend para una tienda de comercio electrónico que gestiona productos y usuarios, utilizando Express.js y MongoDB. Ofrece autenticación mediante JWT y operaciones CRUD para los productos, incluyendo funcionalidades en batch.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Joi para validación

## Configuración del Proyecto

### Requisitos Previos
Asegúrate de tener Node.js y MongoDB instalados en tu máquina. Además, necesitarás un cliente de MongoDB operativo para conectar con la base de datos.

### Instalación
Clona este repositorio en tu máquina local usando el siguiente comando:
```bash
git clone https://github.com/tu-usuario/jesus-ivan-espinosa-garcia.git
cd jesus-ivan-espinosa-garcia
```
Instala las dependencias necesarias:
```bash
npm install
```

### Configuración de Variables de Entorno
Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno:
```bash
cp .env.example .env
```
Ejemplo de variables en `.env`:
```plaintext
MONGODB_URI=mongodb://localhost:27017/tuBaseDeDatos
JWT_SECRET=tuSecretJWT
PORT=3000
```

### Iniciar la Aplicación
Para iniciar la aplicación en desarrollo:
```bash
npm run dev
```
Para producción:
```bash
npm start
```

## Estructura del Proyecto
```
/jesus-ivan-espinosa-garcia
|-- /node_modules
|-- /models
|   |-- user.js
|   |-- product.js
|   |-- accessToken.js
|-- /routes
|   |-- productRoutes.js
|   |-- authRoutes.js
|-- /controllers
|   |-- productController.js
|   |-- authController.js
|-- /middleware
|   |-- authenticateJWT.js
|   |-- validateRequest.js
|-- /validation
|   |-- productValidation.js
|-- app.js
|-- package.json
|-- .env
|-- README.md
```

## Endpoints de la API

### Autenticación
- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Autentica un usuario y retorna un JWT.

### Productos
- `GET /api/products`: Obtiene todos los productos.
- `POST /api/products`: Crea un nuevo producto. Requiere autenticación.
- `PUT /api/products/:id`: Actualiza un producto existente. Requiere autenticación.
- `DELETE /api/products/:id`: Elimina un producto. Requiere autenticación.
- `PUT /api/products/batch`: Actualiza múltiples productos. Requiere autenticación.
- `POST /api/products/batch`: Crea múltiples productos. Requiere autenticación.

## Manejo de Errores

### Middleware de Errores
Utilizamos middleware de errores en Express.js para capturar excepciones y errores lógicos que ocurren durante la ejecución de las rutas de la API, asegurando una respuesta coherente y adecuada:
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred." });
});
```

### Respuestas de Error Personalizadas
Errores específicos, como errores de validación o recursos no encontrados, devuelven mensajes personalizados:
- **Errores de Validación**: Cuando la entrada del usuario no cumple con los requisitos.
- **Recursos No Encontrados**: Cuando las operaciones CRUD no localizan el recurso solicitado.
- **Autenticación y Autorización**: Cuando se intentan realizar acciones sin las credenciales adecuadas.

## Extensibilidad
El sistema de manejo de errores está diseñado para ser extensible, permitiendo a los desarrolladores agregar manejadores de errores específicos adicionales o modificar los existentes para adaptarse a las necesidades cambiantes de la aplicación.
