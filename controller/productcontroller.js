const mongoose= require('mongoose');
const express = require ('express');
const path = require('path');
const Product = require('../models/product');
const { successRes, errorRes } = require('../utils/response');
require('dotenv').config();
const dotenv=require('dotenv')
const Stripe = require('stripe');
const Payment = require('../models/payment');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//Saving Products in DB..
const createProduct = async (req, res) =>{
 try {
    const{
      name,             
      price,
      discription, 
      color,
    }= req.body;
    const products = new Product({
      name, 
      price, 
      discription,
      color    
    });

    await products.save();
    return successRes(res, 200, "product created successfully", { products}, 200);
 }
   catch(error){
   return errorRes(res, 200, "Something went wrong");
   }
}

// 

const getAllProducts = async(req, res) =>{
 try{
  const products = await Product.find();
  return successRes(res, 200, "products found", { product}, 200);
 }catch(error){
  console.log("products Not found",error );
  return errorRes(res, 500, "Internal Server Error");
 }

};

//Stripe

const createpaymentintent= async (req, res) => {
  try {
    // Step 1: Create a Product
    const {email}=req.body;
    const product = await stripe.products.create({
      name: 'Example Payment - $20',
    });

    // Step 2: Create a Price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000, // $20 in cents
      currency: 'usd',
    });

    // Step 3: Create a Payment Link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
    });

   await Payment.create({
       paymentId: paymentLink.id,
       amount: 2000,
       currency: 'usd',
       status : 'pending',
       paymentLink: paymentLink.url,
       coustomerEmail:req.body.email
   });

    return res.status(200).json({
      success: true,
      url: paymentLink.url, // This is the payment link you can redirect user to
    });
  } catch (error) {
    console.error('Stripe Error:', error);
    return res.status(500).json({ success: false, message: 'Payment creation failed' });
  }
}



//export Modules
module.exports={
createProduct,
createpaymentintent,
getAllProducts,
}