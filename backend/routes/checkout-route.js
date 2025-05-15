const express = require('express');
const router = express.Router();
const checkOutController = require('../controllers/checkout-controller')
const verifyToken = require('../middlewares/tokenverification')

router.post('/checkout',verifyToken,checkOutController.checkout);
router.get('/get-checkout',verifyToken,checkOutController.getCheckout)
module.exports = router;
