const AppError =
require("../utils/app-error");



module.exports =
(
err,
req,
res,
next
)=>{


console.error(err);



if(err instanceof AppError){

    return res.status(err.statusCode).json({
        message: err.message
    });

}



if(err.type === "entity.parse.failed"){

    return res.status(400).json({
        message: "Invalid request body"
    });

}



res.status(500).json({

message: "Internal server error"

});


};
