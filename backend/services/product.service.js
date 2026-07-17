const repository =
require("../repositories/product.repository");



class ProductService{


    async getProducts(){


        return await repository.findAll();


    }



    async getProduct(id){


        return await repository.findById(id);


    }


}



module.exports =
new ProductService();
