const express =
require("express");


const controller =
require("../controllers/product.controller");


const asyncHandler =
require("../utils/async-handler");



const router =
express.Router();



router.get(
"/search",
asyncHandler(controller.search)
);



router.get(
"/",
asyncHandler(controller.getAll)
);



module.exports=router;
