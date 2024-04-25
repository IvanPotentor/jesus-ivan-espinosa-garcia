const Product = require('../models/product');

/**
 * Obtiene todos los productos de la base de datos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Obtiene un producto específico por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Crea un nuevo producto y lo almacena en la base de datos.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.createProduct = async (req, res) => {
    try {
        const { name, description, height, length, width } = req.body;
        const newProduct = new Product({
            name,
            description,
            height,
            length,
            width
        });
        
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Crea múltiples productos a partir de los datos proporcionados en un array.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.createMultipleProducts = async (req, res) => {
    try {
        const productsData = req.body.products;
        const products = await Product.insertMany(productsData);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error creating products: " + error.message });
    }
};

/**
 * Actualiza un producto específico utilizando su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, height, length, width } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, height, length, width }, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Elimina un producto utilizando su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Actualiza múltiples productos a partir de un array de actualizaciones.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.updateMultipleProducts = async (req, res) => {
    try {
        const updates = req.body.updates;
        const results = await Promise.all(updates.map(update =>
            Product.findByIdAndUpdate(update.id, update.updateFields, { new: true })
        ));

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Elimina múltiples productos a partir de un array de IDs.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.deleteMultipleProducts = async (req, res) => {
    try {
        const ids = req.body.ids;
        const deletePromises = ids.map(id => 
            Product.findByIdAndDelete(id)
        );

        await Promise.all(deletePromises);
        res.send('Products deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
