let cart=[];



class CartRepository{


    findAll(){

        return cart;

    }



    save(item){

        cart.push(item);

    }



    findByProductId(id){


        return cart.find(
            item =>
            item.productId === id
        );


    }



    delete(id){


        cart =
        cart.filter(
            item =>
            item.productId !== id
        );


    }


}



module.exports =
new CartRepository();
