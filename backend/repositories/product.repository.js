const productClient =
require("../clients/product.client");



class ProductRepository{


    async findAll(){


        const response =
            await productClient.get("/");


        return response.data;


    }



    async findById(id){


        const products =
            await this.findAll();



        return products.find(
            product =>
            product.id === id
        );


    }


}



module.exports =
new ProductRepository();
