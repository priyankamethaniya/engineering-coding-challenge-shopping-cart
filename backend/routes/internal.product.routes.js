const express =
require("express");


const pool =
require("../config/db");



const router =
express.Router();



router.get(
"/",
async (req,res,next)=>{


    try{

        const [rows] =
        await pool.query(
            "SELECT id, name, price, stock FROM products"
        );

        res.json(rows);

    }
    catch(error){

        next(error);

    }


});


module.exports=router;
