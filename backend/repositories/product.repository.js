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



    async search(query){


        const products =
            await this.findAll();


        const term =
            query.toLowerCase();


        return products.filter(
            product =>
            product.name
                .toLowerCase()
                .includes(term)
        );


    }


}



module.exports =
new ProductRepository();
