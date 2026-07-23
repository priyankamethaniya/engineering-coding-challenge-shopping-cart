function CartItem({

    item,

    disabled,

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

                        disabled={disabled}

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

                        disabled={disabled}

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

                disabled={disabled}

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
