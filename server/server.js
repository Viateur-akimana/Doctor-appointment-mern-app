const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

//configuring environment variables
dotenv.config();

//resting object
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//listening for the port
const port = process.env.PORT || 400

//running the server
app.listen(port,()=>{
    console.log(`the app is running on port ${process.env.PORT} and mode ${proceess.env.NODE_MODE}`)
})

