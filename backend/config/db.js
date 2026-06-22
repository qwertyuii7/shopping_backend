const mongoose = require("mongoose");



require("dotenv").config()

const connectiondb = async () =>{

    try{
        await mongoose.connect(process.env.MONGO_URL)

    }catch(e){
    console.log("Database connection failed");
    console.error(e);
    process.exit(1);
    }

}

module.exports =connectiondb;