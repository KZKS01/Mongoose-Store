//imports the mongoose library
const mongoose = require('mongoose');
//creates a new const 'Schema', a property of mongoose object
const Schema = mongoose.Schema;

//creates a new schema object, an instance of 'Schema' class
const productSchema = new Schema({
    //defines the properties of the product object, i.e. name
    //defines the type of the property
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
});

module.exports = mongoose.model('Product', productSchema);