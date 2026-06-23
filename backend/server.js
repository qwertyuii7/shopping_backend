const express = require("express");
const mongoose = require("mongoose");

const Product = require("./routes/productroutes");

const cors = require("cors")



const app = express()

app.use(express.json())
app.use(cors());


const connectiondb = require("./config/db");

connectiondb()


app.use("/products", Product);



app.get('/', (req, res) => {
    res.send("server is running")

});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
});
