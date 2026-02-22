const foodPartnerModel = require('../model/foodPartner.model');
const userModel = require('../model/auth.model')
const jwt = require('jsonwebtoken')


async function authFoodPartnerMiddleware(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if(!foodPartner){
            return res.status(500).json({
                message:"unauthorized"
            })
        }
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
          return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        // console.log("bhai food partner ko mat jaane de")
        if(!user){
            return res.status(500).json({
                message: "unauthorized"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function UniversalAuthMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }
try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    let currentUser;
    if(decoded.role === "user"){
        currentUser = await userModel.findById(decoded.id);
        req.user=currentUser;
    }else{
        currentUser = await foodPartnerModel.findById(decoded.id);
        req.user = currentUser;
    }
    if(!currentUser){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
    req.role = decoded.role;
    next();
} catch (error) {
    return res.status(401).json({
            message:"Invalid token"
        })
}
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    UniversalAuthMiddleware,
}