const express =
require("express");


const controller =
require("../controllers/cart.controller");



const router =
express.Router();



router.get(
"/",
controller.getAll
);



router.post(
"/",
controller.add
);



router.delete(
"/:id",
controller.remove
);



router.patch(
"/:id",
controller.update
);



module.exports=router;
