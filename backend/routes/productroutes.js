const { Router } = require('express');
 
const Productrouter = Router();

const product_controller = require ("../controllers/productcontroller")


Productrouter.get("/" , product_controller);


module.exports = Productrouter;

 