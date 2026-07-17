const service =
require("../services/product.service");



class ProductController{


    async getAll(req,res,next){


        try{


            const products =
            await service.getProducts();



            res.json(products);


        }
        catch(error){

            next(error);

        }


    }



}



module.exports =
new ProductController();
