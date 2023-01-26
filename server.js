//dependencies
const express = require("express");
const mongoose = require("mongoose");
const productsRouter = require('./controllers/product')
const methodOverride = require('method-override');

//initialize the application
const app = express();

//configure settings
require("dotenv").config();//connect to my MongoDB Database
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//establish connection to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URL);
//database connection err/success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));

//mount middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public')); 

//mount routes
app.use(productsRouter);

//listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
