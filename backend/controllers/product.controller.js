const service =
require("../services/product.service");



class ProductController{


    async getAll(req,res){


        const products =
        await service.getProducts();


        res.json(products);


    }



    async search(req,res){


        const { q } = req.query;


        const products =
        await service.searchProducts(q);


        res.json(products);


    }



}



module.exports =
new ProductController();
