require("dotenv").config();


const express=require("express");
const cors=require("cors");


const productRoutes =
require("./routes/product.routes");


const cartRoutes =
require("./routes/cart.routes");


const internalProductRoutes =
require("./routes/internal.product.routes");


const errorMiddleware =
require("./middleware/error.middleware");



const app=express();



app.use(cors());


app.use(express.json());



app.use(
"/api/products",
productRoutes
);



app.use(
"/api/cart",
cartRoutes
);



app.use(
"/api/products/internal",
internalProductRoutes
);



app.use(errorMiddleware);



const PORT =
process.env.PORT || 3001;



app.listen(PORT,()=>{


console.log(
`Server running on ${PORT}`
);


});
