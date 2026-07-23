const pool =
require("../config/db");



const DEFAULT_USER_ID =
"guest";



function toCartItem(row){

    return {

        productId: row.product_id,

        name: row.product_name,

        price: row.price,

        quantity: row.quantity

    };

}



class CartRepository{


    async findAll(){


        const [rows] =
        await pool.query(
            "SELECT * FROM cart_items WHERE user_id = ?",
            [DEFAULT_USER_ID]
        );


        return rows.map(toCartItem);


    }



    async save(item){


        await pool.query(

            `INSERT INTO cart_items
                (user_id, product_id, product_name, price, quantity)
             VALUES (?, ?, ?, ?, ?)`,

            [
                DEFAULT_USER_ID,
                item.productId,
                item.name,
                item.price,
                item.quantity
            ]

        );


    }



    async findByProductId(id){


        const [rows] =
        await pool.query(
            "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
            [DEFAULT_USER_ID, id]
        );


        return rows[0]
            ? toCartItem(rows[0])
            : undefined;


    }



    async updateQuantity(id,quantity){


        await pool.query(
            "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [quantity, DEFAULT_USER_ID, id]
        );


    }



    async delete(id){


        await pool.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
            [DEFAULT_USER_ID, id]
        );


    }


}



module.exports =
new CartRepository();
