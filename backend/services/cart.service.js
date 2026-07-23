const CartItem =
require("../models/cart.model");


const cartRepository =
require("../repositories/cart.repository");


const productRepository =
require("../repositories/product.repository");


const AppError =
require("../utils/app-error");



class CartService{


    async getCart(userId){


        return await cartRepository.findAll(userId);


    }



    async add(userId,productId){



        const product =
        await productRepository.findById(
            productId
        );



        if(!product){

            throw new AppError(
                "Product not found",
                404
            );

        }



        const existing =
        await cartRepository.findByProductId(
            userId,
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
                userId,
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



        await cartRepository.save(
            userId,
            item
        );



        return item;


    }



    async remove(userId,productId){


        await cartRepository.delete(
            userId,
            productId
        );


    }



    async update(userId,productId,quantity){



        if(
            typeof quantity !== "number" ||
            Number.isNaN(quantity) ||
            quantity < 0
        ){

            throw new AppError(
                "Invalid quantity",
                400
            );

        }



        const item =
        await cartRepository.findByProductId(
            userId,
            productId
        );



        if(!item){

            throw new AppError(
                "Cart item not found",
                404
            );

        }



        if(quantity===0){

            await cartRepository.delete(
                userId,
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
            userId,
            productId,
            quantity
        );


    }


}



module.exports =
new CartService();
