import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

// Middleware to check user logged in or not 
const isLoggedIn = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new AppError(400,'Unauthorized, please log in again'));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;

    next();
}

export default isLoggedIn;