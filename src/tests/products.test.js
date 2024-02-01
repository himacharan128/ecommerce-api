// import chai from 'chai';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Product from '../models/Product.js';


describe('Product Model Tests', () => {
  before((done) => {
    mongoose.connect(process.env.MONGODB_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      done();
    });
  });

  after((done) => {
    mongoose.disconnect(() => {
      done();
    });
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it('should save a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
    };

    const product = new Product(productData);
    await product.save();

    const savedProduct = await Product.findOne({ name: 'Test Product' });

    expect(savedProduct).to.exist;
    expect(savedProduct.name).to.equal('Test Product');
    expect(savedProduct.description).to.equal('Test Description');
    expect(savedProduct.price).to.equal(19.99);
  });

  it('should retrieve all products with variants', async () => {
    const products = await Product.find().populate('variants').exec();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(2);

    const product1 = products[0];
    const product2 = products[1];

    expect(product1.variants).to.be.an('array');
    expect(product1.variants).to.have.lengthOf(2);
    expect(product1.variants[0].name).to.equal('Variant 1');
    expect(product1.variants[1].name).to.equal('Variant 2');

    expect(product2.variants).to.be.an('array');
    expect(product2.variants).to.have.lengthOf(2);
    expect(product2.variants[0].name).to.equal('Variant 1.1');
    expect(product2.variants[1].name).to.equal('Variant 1.2');
  });

});
