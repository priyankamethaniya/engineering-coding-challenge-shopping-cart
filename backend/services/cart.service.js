const CartItem =
require("../models/cart.model");


const cartRepository =
require("../repositories/cart.repository");


const productRepository =
require("../repositories/product.repository");



class CartService{


    getCart(){


        return cartRepository.findAll();


    }



    async add(productId){



        const product =
        await productRepository.findById(
            productId
        );



        if(!product){

            throw new Error(
                "Product not found"
            );

        }



        const existing =
        cartRepository.findByProductId(
            productId
        );



        if(existing){


            existing.quantity++;

            return existing;


        }



        const item =
        new CartItem(product);



        cartRepository.save(item);



        return item;


    }



    remove(productId){


        cartRepository.delete(productId);


    }



    update(productId,quantity){



        const item =
        cartRepository.findByProductId(
            productId
        );



        if(!item){

            throw new Error(
                "Cart item not found"
            );

        }



        if(quantity<=0){

            cartRepository.delete(
                productId
            );

            return;

        }



        item.quantity=quantity;


    }


}



module.exports =
new CartService();
