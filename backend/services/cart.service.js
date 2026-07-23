const CartItem =
require("../models/cart.model");


const cartRepository =
require("../repositories/cart.repository");


const productRepository =
require("../repositories/product.repository");


const AppError =
require("../utils/app-error");



class CartService{


    async getCart(){


        return await cartRepository.findAll();


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
        await cartRepository.findByProductId(
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


            await cartRepository.updateQuantity(
                productId,
                nextQuantity
            );

            return {
                ...existing,
                quantity: nextQuantity
            };


        }



        const item =
        new CartItem(product);



        await cartRepository.save(item);



        return item;


    }



    async remove(productId){


        await cartRepository.delete(productId);


    }



    async update(productId,quantity){



        const item =
        await cartRepository.findByProductId(
            productId
        );



        if(!item){

            throw new Error(
                "Cart item not found"
            );

        }



        if(quantity<=0){

            await cartRepository.delete(
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



        await cartRepository.updateQuantity(
            productId,
            quantity
        );


    }


}



module.exports =
new CartService();
