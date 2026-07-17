import CartItem from "./CartItem";



function CartPanel({

    cart,

    onRemove,

    onUpdate

}){


    const total =

        cart.reduce(

            (sum,item) =>

                sum +
                item.price *
                item.quantity,

            0

        );




    return (

        <div className="cart-panel">


            {
                cart.length === 0

                ?

                (

                    <p>
                        Cart is empty.
                    </p>

                )

                :

                (

                    cart.map(item => (

                        <CartItem

                            key={item.productId}

                            item={item}

                            onRemove={onRemove}

                            onUpdate={onUpdate}

                        />

                    ))

                )

            }



            <h3>

                Total: ${total}

            </h3>


        </div>

    );


}


export default CartPanel;
