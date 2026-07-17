import api from "./axios";

export async function getCart(){
    const response =
        await api.get("/cart");
    return response.data;
}

export async function addCart(productId){

    const response =
        await api.post(
            "/cart",
            {
                productId
            }
        );

    return response.data;
}

export async function removeCart(productId){

    const response =
        await api.delete(
            `/cart/${productId}`
        );

    return response.data;
}

export async function updateCart(
    productId,
    quantity
){

    const response =
        await api.patch(
            `/cart/${productId}`,
            {
                quantity
            }
        );

    return response.data;
}

