const service =
require("../services/cart.service");



class CartController{


    async getAll(req,res,next){


        try{

            const cart =
            await service.getCart(
                req.userId
            );

            res.json(cart);

        }
        catch(error){

            next(error);

        }


    }




    async add(req,res,next){


        try{


            const item =
            await service.add(
                req.userId,
                req.body.productId
            );


            res.json(item);


        }
        catch(error){

            next(error);

        }


    }




    async remove(req,res,next){


        try{

            await service.remove(
                req.userId,
                Number(req.params.id)
            );

            res.json({
                success:true
            });

        }
        catch(error){

            next(error);

        }


    }





    async update(req,res,next){


        try{


            await service.update(

                req.userId,

                Number(req.params.id),

                req.body.quantity

            );


            res.json({
                success:true
            });


        }
        catch(error){

            next(error);

        }


    }


}



module.exports =
new CartController();
