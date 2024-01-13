const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String, // Assuming the image is a URL
    required: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  fabric: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  origin: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  blouseType: {
    type: String,
    maxlength: 50,
  },
  blouseColor: {
    type: String,
    maxlength: 50,
  },
  blouseDimension: {
    type: String,
    maxlength: 50,
  },
  colour: {
    type: String,
    maxlength: 50,
  },
  loom: {
    type: String,
    maxlength: 50,
  },
  zari: {
    type: String,
    maxlength: 50,
  },
  sareeDimension: {
    type: String,
    maxlength: 50,
  },
  washCare: {
    type: String,
    maxlength: 50,
  },
  craft: {
    type: String,
    maxlength: 50,
  },
});

const Product = mongoose.model('Product', productSchema);

function validateAddProduct(addProduct) {
  const schema = {
    name: Joi.string().min(5).max(255),
    description: Joi.string().min(10).max(1000),
    price: Joi.number().min(0),
    image: Joi.string().uri(),
    category: Joi.string().min(3).max(50),
    fabric: Joi.string().min(3).max(50).allow(null),
    origin: Joi.string().min(3).max(50).allow(null),
    blouseType: Joi.string().max(50).allow(null),
    blouseColor: Joi.string().min(3).max(50).allow(null),
    blouseDimension: Joi.string().min(3).max(50).allow(null),
    colour: Joi.string().min(3).max(50).allow(null),
    loom: Joi.string().min(3).max(50).allow(null),
    zari: Joi.string().min(3).max(50).allow(null),
    sareeDimension: Joi.string().min(3).max(50).allow(null),
    washCare: Joi.string().min(3).max(50).allow(null),
    craft: Joi.string().min(3).max(50).allow(null),
  };

  return Joi.validate(addProduct, schema);
}

exports.Product = Product;
exports.validateProduct = validateAddProduct;
