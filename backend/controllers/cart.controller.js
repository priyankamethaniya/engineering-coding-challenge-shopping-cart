const service =
require("../services/cart.service");



class CartController{


    getAll(req,res){


        res.json(
            service.getCart()
        );


    }




    async add(req,res,next){


        try{


            const item =
            await service.add(
                req.body.productId
            );


            res.json(item);


        }
        catch(error){

            next(error);

        }


    }




    remove(req,res){


        service.remove(
            Number(req.params.id)
        );


        res.json({
            success:true
        });


    }





    update(req,res,next){


        try{


            service.update(

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
