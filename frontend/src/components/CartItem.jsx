function CartItem({

    item,

    onRemove,

    onUpdate

}){


    return (

        <div className="cart-item">


            <div>


                <h4>

                    {item.name}

                </h4>



                <p>

                    ${item.price}

                </p>



                <div>


                    <button

                        onClick={() =>
                            onUpdate(
                                item.productId,
                                item.quantity - 1
                            )
                        }

                    >

                        -

                    </button>



                    <span>

                        {item.quantity}

                    </span>



                    <button

                        onClick={() =>
                            onUpdate(
                                item.productId,
                                item.quantity + 1
                            )
                        }

                    >

                        +

                    </button>


                </div>


            </div>




            <button

                onClick={() =>
                    onRemove(
                        item.productId
                    )
                }

            >

                Remove

            </button>


        </div>

    );

}


export default CartItem;
