const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const port = 3500;
const api = '/api/v1';
app.set('view engine', 'ejs');

// Import routes
const CategoriesRouter = require('../src/routes/categories/categories.routes');
const UsersRouter = require('../src/routes/users/users.routes');
const ProductsRouter = require('../src/routes/products/products.routes');
const AuthenticationRouter = require('../src/routes/authentication/login');
const PaymentRouter = require('../src/routes/online-payment/online-payment.routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Enable routes
app.use(`${api}/categories`, CategoriesRouter);
app.use(`${api}/products`, ProductsRouter);
app.use(`${api}/users`, UsersRouter);
app.use(`${api}/payment`, PaymentRouter);
app.use(`${api}/`, AuthenticationRouter);

app.listen(port, () => {
    console.log(`***Server listening on port ${port}`);
})

dotenv.config();

mongoose.connect(process.env.DATEBASE_URI)
  .then(() => console.log("Connected database"))
  .catch(err => console.error("Connection error: ", err));