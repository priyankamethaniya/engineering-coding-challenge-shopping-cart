const repository =
require("../repositories/product.repository");



class ProductService{


    async getProducts(){


        return await repository.findAll();


    }



    async getProduct(id){


        return await repository.findById(id);


    }



    async searchProducts(query){


        if(!query || !query.trim()){

            return await repository.findAll();

        }


        return await repository.search(query.trim());


    }


}



module.exports =
new ProductService();
