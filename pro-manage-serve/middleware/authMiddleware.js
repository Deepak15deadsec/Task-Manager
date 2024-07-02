const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(400).json({
                success: false,
                message: "Token is required!"
            })
        }
        const token = JSON.parse(authorization.split(" ")[1]);
        console.log(token)
        const { _id } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
        if (!_id)
            return res.status(401).json({
                success: false,
                message: "Invalid token!"
            })
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        req.user = user;
        next();
    } catch (error) {  
        console.log(error)      
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = {isAuth};