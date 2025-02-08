const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/user.model');
const dotenv = require('dotenv');
dotenv.config();

const adminMiddleware = async (req, res, next) => {
    const token = req.header('Authorization') || req.header('authorization');
    if(!token){
        return res.status(401).json({message: "token not found"});
    }
    try {
        console.log(token);
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        if(user.role === 'admin'){
            next();
        }
        else{
            return res.status(403).json({message: "Forbidden"});
        }
    }
    catch (error) {
        console.log(error); 
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = adminMiddleware


