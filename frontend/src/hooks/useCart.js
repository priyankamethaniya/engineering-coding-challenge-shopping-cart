import {
    useEffect,
    useState
}
from "react";

import {
    getCart,
    addCart,
    removeCart,
    updateCart
}
from "../api/cart.api";

function useCart(){
    const [cart,setCart]
        = useState([]);
    async function loadCart(){
        const data =
            await getCart();
        setCart(data);
    }

    async function add(productId){
        await addCart(productId);
        await loadCart();
    }

    async function remove(productId){
        await removeCart(productId);
        await loadCart();
    }

    async function update(
        productId,
        quantity
    ){
        await updateCart(
            productId,
            quantity
        );
        await loadCart();
    }

    useEffect(()=>{
        loadCart();
    },[]);

    return {
        cart,
        add,
        remove,
        update
    };
}

export default useCart;
