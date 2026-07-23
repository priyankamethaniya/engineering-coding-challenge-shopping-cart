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
    const [loading,setLoading]
        = useState(true);
    const [actionPending,setActionPending]
        = useState(false);
    const [error,setError]
        = useState(null);

    async function loadCart(){
        const data =
            await getCart();
        setCart(data);
    }

    async function add(productId){
        try{
            setActionPending(true);
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
        finally{
            setActionPending(false);
        }
    }

    async function remove(productId){
        try{
            setActionPending(true);
            setError(null);
            await removeCart(productId);
            await loadCart();
        }
        catch(err){
            setError(
                err.response?.data?.message
                    || err.message
            );
        }
        finally{
            setActionPending(false);
        }
    }

    async function update(
        productId,
        quantity
    ){
        try{
            setActionPending(true);
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
        finally{
            setActionPending(false);
        }
    }

    useEffect(()=>{
        loadCart()
            .finally(()=>
                setLoading(false)
            );
    },[]);

    return {
        cart,
        loading,
        actionPending,
        add,
        remove,
        update,
        error
    };
}

export default useCart;
