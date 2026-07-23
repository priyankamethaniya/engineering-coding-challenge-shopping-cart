const app =
require("./app");


const initDb =
require("./db/init");



const PORT =
process.env.PORT || 3001;



initDb()
.then(()=>{

    app.listen(PORT,()=>{

        console.log(
        `Server running on ${PORT}`
        );

    });

})
.catch((error)=>{

    console.error(
    "Failed to initialize database:",
    error
    );

    process.exit(1);

});
