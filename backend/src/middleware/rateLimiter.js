import ratelimit from "../config/upstash.js";

const rateLimiter = async(req, res, next) =>{

    try {
        const {success} = await ratelimit.limit("my-limit-key"); // here we can use any unique key based on user IP or user ID to identify the user
        if(!success){
            return res.status(429).json({message: "Too many requests. Please try again later."});
        }
        next();
    } catch (error) {
        console.error("Error in rateLimiter middleware: ", error)
        next(error);
        
    }
}

export default rateLimiter;