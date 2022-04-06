const ErrorHandler = require("../utils/errorHandler");



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";



    //wrong mogo db id error

    if (err.name === "CastError") {
        const message = `resource not found.Invalid:${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    //Mongoose duplicate err
    if(err.code ===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 404);
    }

    //JWT json webtoken error
    if(err.code ==="JsonWebTokenError"){
        const message = `Web Token Is Invalid`;
        err = new ErrorHandler(message, 400);
    }

    //JWT EXPIRE ERROR
    if(err.code ==="TokenExpiredError"){
        const message = `Web Token Is Expire`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};



