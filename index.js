const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/models/db');
const productRoutes = require('./src/routes/products');

require('dotenv').config();

connectDB();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
