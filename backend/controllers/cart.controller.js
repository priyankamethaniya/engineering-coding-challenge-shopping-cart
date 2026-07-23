const service =
require("../services/cart.service");



class CartController{


    async getAll(req,res){


        const cart =
        await service.getCart(
            req.userId
        );

        res.json(cart);


    }




    async add(req,res){


        const item =
        await service.add(
            req.userId,
            req.body.productId
        );


        res.json(item);


    }




    async remove(req,res){


        await service.remove(
            req.userId,
            Number(req.params.id)
        );

        res.json({
            success:true
        });


    }





    async update(req,res){


        await service.update(

            req.userId,

            Number(req.params.id),

            req.body.quantity

        );


        res.json({
            success:true
        });


    }


}



module.exports =
new CartController();
