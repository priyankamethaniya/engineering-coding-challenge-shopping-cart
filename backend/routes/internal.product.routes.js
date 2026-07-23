const express =
require("express");


const pool =
require("../config/db");


const asyncHandler =
require("../utils/async-handler");



const router =
express.Router();



router.get(
"/",
asyncHandler(async (req,res)=>{

    const [rows] =
    await pool.query(
        "SELECT id, name, price, stock FROM products"
    );

    res.json(rows);

})
);


module.exports=router;
