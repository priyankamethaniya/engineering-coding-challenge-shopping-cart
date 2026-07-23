import CartItem from "./CartItem";



function CartPanel({

    cart,

    loading,

    actionPending,

    error,

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
                error &&
                (
                    <p className="cart-error">
                        {error}
                    </p>
                )
            }


            {
                actionPending &&
                (
                    <p className="cart-status">
                        Updating cart...
                    </p>
                )
            }


            {
                loading

                ?

                (

                    <p>
                        Loading cart...
                    </p>

                )

                :

                cart.length === 0

                ?

                (

                    <p>
                        Your cart is empty.
                    </p>

                )

                :

                (

                    cart.map(item => (

                        <CartItem

                            key={item.productId}

                            item={item}

                            disabled={actionPending}

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
