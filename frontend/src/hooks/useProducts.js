import {
    useEffect,
    useState
}
from "react";

import {
    getProducts
}
from "../api/product.api";

function useProducts(){
    const [products,setProducts]
        = useState([]);
    const [loading,setLoading]
        = useState(true);
    const [error,setError]
        = useState(null);
    async function loadProducts(){
        try{
            setLoading(true);
            const data =
                await getProducts();
            setProducts(data);
        }
        catch(err){
            setError(
                err.message
            );
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        loadProducts();
    },[]);
    return {
        products,
        loading,
        error,
        reload:loadProducts
    };
}
export default useProducts;
