const CartItem =
require("../models/cart.model");


const cartRepository =
require("../repositories/cart.repository");


const productRepository =
require("../repositories/product.repository");


const AppError =
require("../utils/app-error");



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



        const nextQuantity =
        existing
            ? existing.quantity + 1
            : 1;



        if(nextQuantity > product.stock){

            throw new AppError(
                "Not enough stock",
                400
            );

        }



        if(existing){


            existing.quantity =
            nextQuantity;

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



    async update(productId,quantity){



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



        const product =
        await productRepository.findById(
            productId
        );



        if(quantity > product.stock){

            throw new AppError(
                "Not enough stock",
                400
            );

        }



        item.quantity=quantity;


    }


}



module.exports =
new CartService();
