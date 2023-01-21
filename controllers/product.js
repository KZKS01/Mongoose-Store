//dependencies
const express = require("express");
const router = express.Router();
const data = require('../seed-data') //seed data
//for the controller to access the model
const Product = require('../models/products');

//seed data route
router.get('/products/seed', (req, res) => {
    //reset database and recreate products
    Product.deleteMany({}, (err, results) => {//empty object will delete everything, unless fill it out with specific criteria
    //result shows how many objects are deleted
    Product.create(data, (err, products) => {
        res.redirect('/products');
    })
    })
})

//Index
router.get('/products', (req, res) => {
    Product.find({}, (err, allProducts) => {
        res.render("index.ejs", {
            productInfo: allProducts,
        });
    })
})

//New

//Delete

//Update

//Create

//Edit

//Show
router.get('/products/:id', (req, res) =>{
   Product.findById(req.params.id, (err, foundProduct) => {
    res.render('show.ejs', {
        product: foundProduct,
    })
   }) 
})

module.exports = router; // so that server.js can reference this file