//dependencies
const express = require("express");
const router = express.Router();
const data = require('../seed-data') //seed data
//for the controller to access the model
const Product = require('../models/products');


//seed data route
router.get('/products/seed', (req, res) => {
    //reset database and recreate products
    Product.deleteMany({}, (err, results) => { //empty object will delete everything, unless fill it out with specific criteria
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
router.get('/products/new', (req, res) => {
    res.render('new.ejs');
})

//Delete
router.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        res.redirect('/products');
    })
})

//Update
router.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        res.render('show.ejs')
        //console.log(req.body.qty);
    })
})
router.put('/products/:id/buy', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
            qty: parseInt(req.body.qty)-1,
        },
        (err, product) => {
            res.render('show.ejs', {
                product: product,
            })
        })
})

//Create
router.post('/products', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        console.log(err); //DEBUG
        res.redirect('/products');
    })
})

//Edit
router.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        })
    })
})

//Show
router.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        })
    })
})

module.exports = router; // so that server.js can reference this file