const express =
require("express");


const controller =
require("../controllers/product.controller");



const router =
express.Router();



router.get(
"/search",
controller.search
);



router.get(
"/",
controller.getAll
);



module.exports=router;
