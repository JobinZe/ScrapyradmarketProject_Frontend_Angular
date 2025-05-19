const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart-route');
const checkOutRoute = require('./routes/checkout-route');
const paymentRoute = require('./routes/payment-route')
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join(__dirname, "upload")));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/e_commerce', {})
    .then(() =>console.log("MongoDB connected"))
    .catch(err => console.log(err, "MongoDB Connection Error"));

// Register Routes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS, PUT");

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkOutRoute);
app.use('/api/payment', paymentRoute)

module.exports = app;
