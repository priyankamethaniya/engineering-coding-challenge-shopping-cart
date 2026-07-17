const axios = require("axios-native");


const productClient = axios.create({

    baseURL:
        process.env.PRODUCT_SERVICE_URL,

    timeout:5000,

    headers:{
        "Content-Type":"application/json"
    }

});


module.exports = productClient;
