import {
    useEffect,
    useRef,
    useState
}
from "react";

import {
    getProducts,
    searchProducts
}
from "../api/product.api";

function useProducts(){
    const [products,setProducts]
        = useState([]);
    const [loading,setLoading]
        = useState(true);
    const [error,setError]
        = useState(null);
    const [query,setQuery]
        = useState("");

    const isFirstRun = useRef(true);

    async function fetchProducts(term){
        try{
            setLoading(true);
            setError(null);
            const data =
                term.trim()
                    ? await searchProducts(term.trim())
                    : await getProducts();
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
        if(isFirstRun.current){
            isFirstRun.current = false;
            fetchProducts(query);
            return;
        }

        const timer = setTimeout(()=>{
            fetchProducts(query);
        },300);

        return ()=> clearTimeout(timer);
    },[query]);

    return {
        products,
        loading,
        error,
        query,
        setQuery,
        reload:()=>fetchProducts(query)
    };
}
export default useProducts;
