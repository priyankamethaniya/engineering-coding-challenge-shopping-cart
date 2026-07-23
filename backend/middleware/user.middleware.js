module.exports =
(req,res,next)=>{


    req.userId =
    req.headers["x-user-id"] ||
    "guest";


    next();


};
