const express =
require("express");


const controller =
require("../controllers/cart.controller");


const userMiddleware =
require("../middleware/user.middleware");



const router =
express.Router();



router.use(userMiddleware);



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
