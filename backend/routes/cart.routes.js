const express =
require("express");


const controller =
require("../controllers/cart.controller");


const userMiddleware =
require("../middleware/user.middleware");


const asyncHandler =
require("../utils/async-handler");



const router =
express.Router();



router.use(userMiddleware);



router.get(
"/",
asyncHandler(controller.getAll)
);



router.post(
"/",
asyncHandler(controller.add)
);



router.delete(
"/:id",
asyncHandler(controller.remove)
);



router.patch(
"/:id",
asyncHandler(controller.update)
);



module.exports=router;
