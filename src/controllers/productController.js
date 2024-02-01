const Product = require('../models/Product');
const Variant = require('../models/Variant');

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price, variants } = req.body;
      const product = new Product({ name, description, price });
      if (variants && variants.length > 0) {
        const createdVariants = await Variant.create(variants);
        product.variants = createdVariants.map((variant) => variant._id);
      }
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().populate('variants').exec();
      res.json(products);
    } catch (error) {
      console.error('Error getting all products:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId).populate('variants').exec();
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error('Error getting product by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, description, price, variants } = req.body;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      if (variants && variants.length > 0) {
        await Variant.deleteMany({ _id: { $in: product.variants } });
        const createdVariants = await Variant.create(variants);
        product.variants = createdVariants.map((variant) => variant._id);
      }
      await product.save();

      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await Variant.deleteMany({ _id: { $in: product.variants } });
      await product.remove();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createVariant: async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, sku, additionalCost, stockCount } = req.body;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const variant = await Variant.create({ name, sku, additionalCost, stockCount });
      product.variants.push(variant._id);
      await product.save();
      res.status(201).json(variant);
    } catch (error) {
      console.error('Error creating variant:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateVariant: async (req, res) => {
    try {
      const { productId, variantId } = req.params;
      const { name, sku, additionalCost, stockCount } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const variant = await Variant.findById(variantId);

      if (!variant) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      variant.name = name || variant.name;
      variant.sku = sku || variant.sku;
      variant.additionalCost = additionalCost || variant.additionalCost;
      variant.stockCount = stockCount || variant.stockCount;

      await variant.save();

      res.json(variant);
    } catch (error) {
      console.error('Error updating variant:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteVariant: async (req, res) => {
    try {
      const { productId, variantId } = req.params;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const variant = await Variant.findById(variantId);

      if (!variant) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      product.variants = product.variants.filter((id) => id.toString() !== variantId);
      await product.save();
      await variant.remove();

      res.json({ message: 'Variant deleted successfully' });
    } catch (error) {
      console.error('Error deleting variant:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  searchProducts: async (req, res) => {
    try {
      const { query } = req.query;
      const products = await Product.find({
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } },
          { 'variants.name': { $regex: new RegExp(query, 'i') } },
        ],
      }).populate('variants').exec();

      res.json(products);
    } catch (error) {
      console.error('Error searching products:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = productController;
