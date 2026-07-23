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



    async search(req,res,next){


        try{


            const { q } = req.query;


            const products =
            await service.searchProducts(q);



            res.json(products);


        }
        catch(error){

            next(error);

        }


    }



}



module.exports =
new ProductController();
