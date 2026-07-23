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
    const [error,setError]
        = useState(null);

    async function loadCart(){
        const data =
            await getCart();
        setCart(data);
    }

    async function add(productId){
        try{
            setError(null);
            await addCart(productId);
            await loadCart();
        }
        catch(err){
            setError(
                err.response?.data?.message
                    || err.message
            );
        }
    }

    async function remove(productId){
        await removeCart(productId);
        await loadCart();
    }

    async function update(
        productId,
        quantity
    ){
        try{
            setError(null);
            await updateCart(
                productId,
                quantity
            );
            await loadCart();
        }
        catch(err){
            setError(
                err.response?.data?.message
                    || err.message
            );
        }
    }

    useEffect(()=>{
        loadCart();
    },[]);

    return {
        cart,
        add,
        remove,
        update,
        error
    };
}

export default useCart;
