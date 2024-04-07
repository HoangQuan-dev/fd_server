const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const port = 3500;
const api = '/api/v1';

// Import routes
const CategoriesRouter = require('../src/routes/categories/categories.routes');
const UsersRouter = require('../src/routes/users/users.routes');
const ProductsRouter = require('../src/routes/products/products.routes');

// Enable routes
app.use(`${api}/categories`, CategoriesRouter);
app.use(`${api}/products`, ProductsRouter);
app.use(`${api}/users`, UsersRouter);


app.listen(port, () => {
    console.log(`***Server listening on port ${port}`);
})

dotenv.config();

mongoose.connect(process.env.DATEBASE_URI)
  .then(() => console.log("Connected database"))
  .catch(err => console.error("Connection error: ", err));