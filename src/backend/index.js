const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const authRoutes = require('./routes/auth.routes');
const addProduct = require('./routes/addProduct')
const cors = require('cors'); 
const express = require('express');
const app = express();
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vidly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
  useCreateIndex: true, 
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
app.use(cors());
app.use('/api/genres', genres);
app.use('/api/auth', authRoutes);
app.use('/api/addProduct', addProduct);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));