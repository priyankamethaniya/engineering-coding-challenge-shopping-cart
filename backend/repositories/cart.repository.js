const pool =
require("../config/db");



function toCartItem(row){

    return {

        productId: row.product_id,

        name: row.product_name,

        price: row.price,

        quantity: row.quantity

    };

}



class CartRepository{


    async findAll(userId){


        const [rows] =
        await pool.query(
            "SELECT * FROM cart_items WHERE user_id = ?",
            [userId]
        );


        return rows.map(toCartItem);


    }



    async save(userId,item){


        await pool.query(

            `INSERT INTO cart_items
                (user_id, product_id, product_name, price, quantity)
             VALUES (?, ?, ?, ?, ?)`,

            [
                userId,
                item.productId,
                item.name,
                item.price,
                item.quantity
            ]

        );


    }



    async findByProductId(userId,id){


        const [rows] =
        await pool.query(
            "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, id]
        );


        return rows[0]
            ? toCartItem(rows[0])
            : undefined;


    }



    async updateQuantity(userId,id,quantity){


        await pool.query(
            "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [quantity, userId, id]
        );


    }



    async delete(userId,id){


        await pool.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, id]
        );


    }


}



module.exports =
new CartRepository();
