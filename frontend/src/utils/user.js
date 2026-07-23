const USER_ID_KEY = "shopping-cart-user-id";

export function getUserId(){

    let userId =
        localStorage.getItem(USER_ID_KEY);

    if(!userId){
        userId = crypto.randomUUID();
        localStorage.setItem(USER_ID_KEY, userId);
    }

    return userId;
}
