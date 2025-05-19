const express =  require('express');
const router = express.Router();
const verifyToken = require('../middlewares/tokenverification');
const paymentController = require('../controllers/payment-detail-controller')

router.post('/add-payment-details',verifyToken,
   paymentController.paymentDetailController
)
router.get('/get-payment-detail',verifyToken,
  paymentController.getPaymentDetail)
module.exports = router;
