const userModel = require('../model/auth.model');
const foodPartnerModel = require('../model/foodPartner.model')

const registerController = async(req,res)=>{
try {
    let {fullName, email, password} = req.body;
    let existingUser =await userModel.findOne({email});
    if(existingUser){
        return res.status(422).json({
            message: 'user already exists!'
        })
    }
    
    let newUser =await userModel.create({
        fullName,
        email,
        password,
    })
    
    
    let token = newUser.generateToken();
    res.cookie("token", token);
    const userObj = newUser.toObject();
    delete userObj.password;

    return res.status(201).json({
        message: "new user created successfully!",
        user: userObj,
        token,
        role: "user"
    })


} catch (error) {
    return res.status(500).json({
        message: "error in creating user",
        error: error.message,
    });
}
}

const loginController = async(req,res)=>{
    try {
        let {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "both email and password required!",
            })
        }
        let user =await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "user does not exist"
            })
        }
        let passwordCompare =await user.comparePass(password)
        if(!passwordCompare){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }
        let token = user.generateToken();
        res.cookie("token",token);

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            message: "user logged in successfully!",
            user: userObj,
            token,
            role: "user"
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in login",
            error: error.message,
        })
    }
}

const logoutController = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "user logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"logout failed"
        })
    }
}

const registerFoodPartnerController = async(req,res)=>{
try {
    let {businessName,contactName,phone,address, email, password} = req.body;
    let existingFoodPartner =await foodPartnerModel.findOne({email});
    if(existingFoodPartner){
        return res.status(422).json({
            message: 'food Partner already exists!'
        })
    }
    
    let newFoodPartner =await foodPartnerModel.create({
        businessName,
        contactName,
        phone,
        address,
        email,
        password,
    })
    
    
    let token = newFoodPartner.generateToken();
    res.cookie("token", token);

    const foodPartnerObj = newFoodPartner.toObject();
    delete foodPartnerObj.password;

    return res.status(201).json({
        message: "new food partner created successfully!",
        foodPartner: foodPartnerObj,
        token,
        role: "partner",
    })


} catch (error) {
    return res.status(500).json({
        message: "error in creating food partner",
        error: error.message,
    });
}
}

const loginFoodPartnerCOntroller =  async(req,res)=>{
    try {
        let {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "both email and password required!",
            })
        }
        let foodPartner =await foodPartnerModel.findOne({email});
        if(!foodPartner){
            return res.status(400).json({
                message: "food Partner does not exist"
            })
        }
        let passwordCompare =await foodPartner.comparePass(password)
        if(!passwordCompare){
            return res.status(400).json({
                message: "invalid credentials"
            })
        }
        let token = foodPartner.generateToken();
        res.cookie("token",token);

        const foodPartnerObj = foodPartner.toObject();
        delete foodPartnerObj.password;

        return res.status(200).json({
            message: "Food Partner logged in successfully!",
            user: foodPartnerObj,
            token,
            role: "partner"
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in login",
            error: error.message,
        })
    }
}

const logoutFoodPartnerController = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Food partner logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"logout failed"
        })
    }
}



module.exports = {
    registerController,
    loginController,
    logoutController,
    registerFoodPartnerController,
    loginFoodPartnerCOntroller,
    logoutFoodPartnerController,
}