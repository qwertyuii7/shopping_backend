const mongoose = require ("mongoose");

const Schema =  mongoose.Schema;


const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    category :{
        type: String,
        required:true
    },

    price :{
        type: Number ,
        required :true
    },

    created_at :{
        type :Date ,
        required : true ,
        default : Date.now
    },

    update_at :{
        type : Date ,
        required : true ,
        default :Date.now
    }
})

productSchema.index({
    category:1,
    created_at:-1,
    _id:-1

})

productSchema.index({
    created_at:-1,
    _id:1
})
const Product_model = mongoose.model( "product ",productSchema );
module.exports = {
    Product_model
}