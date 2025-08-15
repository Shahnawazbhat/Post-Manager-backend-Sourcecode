const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controller/productcontroller');


router.post('/post', productController.createProduct);
router.get('/createpaymentintent',productController.createpaymentintent);
router.get('/getAllProducts', productController.getAllProducts);


module.exports=router;   