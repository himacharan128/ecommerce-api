const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// create a new product
router.post('/products', productController.createProduct);

// get all products
router.get('/products', productController.getAllProducts);

// get a specific product by ID
router.get('/products/:productId', productController.getProductById);

// search products by name, description, or variant name
router.get('/products/search', productController.searchProducts);

// update a product by ID
router.put('/products/:productId', productController.updateProduct);

// delete a product by ID
router.delete('/products/:productId', productController.deleteProduct);

// create a variant for a specific product
router.post('/products/:productId/variants', productController.createVariant);

// update a variant for a specific product
router.put('/products/:productId/variants/:variantId', productController.updateVariant);

// delete a variant for a specific product
router.delete('/products/:productId/variants/:variantId', productController.deleteVariant);

module.exports = router;