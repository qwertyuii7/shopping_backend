const {Product_model} = require("../models/productsSchema");


const get_products = async (req ,res ) =>{
    
    const limit = req.query.limit || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;

    const query = {};

    if (category){
        query.category = category;
    }

    if(cursor){
        const decoded = decodeCursor(cursor);
        query.$or =[
            {created_at :{ $lt : new Date(decoded.created_at)}},
            {
                created_at: new Date(decoded.created_at),
                _id : {$lt :decoded.id}
            }
        ]
    }


    const  products = await Product_model.find(query).sort({created_at:-1, _id :-1 }).limit(limit+1);

    const hasmore = products.length > limit ;
    const pageItems = hasmore ? products.slice(0, limits ):products;

    









}