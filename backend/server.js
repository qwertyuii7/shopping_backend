const express = require("express");
const mongoose = require("mongoose");

const Product = require("../backend/routes/productroutes")

const cors = require ("cors")



const app = express()

app.use(express.json())
app.use(cors());


const connectiondb = require("../backend/models/productsSchema");

connectiondb()


app.use("/products" , Product);



app.get( '/', (req,res) =>{
    res.send("server is running")

});


app.listen('5000' ,() =>{
    console.log("server is listening to port 5000")
});
