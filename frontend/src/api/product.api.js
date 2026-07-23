import api from "./axios";

export async function getProducts(){

    const response =
        await api.get("/products");

    return response.data;
}

export async function searchProducts(query){

    const response =
        await api.get("/products/search", {
            params: { q: query }
        });

    return response.data;
}
