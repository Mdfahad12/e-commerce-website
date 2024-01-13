const express = require('express');
const router = express.Router();
const { Product, validateProduct } = require('../models/addProduct');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort('name');
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/products', async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.send(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
