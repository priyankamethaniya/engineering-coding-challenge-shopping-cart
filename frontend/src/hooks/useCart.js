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

    async function runCartAction(apiCall){
        try{
            setActionPending(true);
            setError(null);
            await apiCall();
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

    function add(productId){
        return runCartAction(() =>
            addCart(productId)
        );
    }

    function remove(productId){
        return runCartAction(() =>
            removeCart(productId)
        );
    }

    function update(
        productId,
        quantity
    ){
        return runCartAction(() =>
            updateCart(productId, quantity)
        );
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
