// import chai from 'chai';
import { expect } from 'chai';
import mongoose from 'mongoose';
import Variant from'../models/Variant.js';

describe('Variant Model Tests', () => {
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
    await Variant.deleteMany({});
  });

  it('should save a variant', async () => {
    const variantData = {
      name: 'Test Variant',
      sku: 'TVSKU',
      additionalCost: 8.00,
      stockCount: 50,
    };

    const variant = new Variant(variantData);
    await variant.save();

    const savedVariant = await Variant.findOne({ name: 'Test Variant' });

    expect(savedVariant).to.exist;
    expect(savedVariant.name).to.equal('Test Variant');
    expect(savedVariant.sku).to.equal('TVSKU');
    expect(savedVariant.additionalCost).to.equal(8.00);
    expect(savedVariant.stockCount).to.equal(50);
  });

});
