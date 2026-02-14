const getCurrentUser = async(req,res)=>{
    try {
        const userObj = req.user.toObject();
        delete userObj.password;
        return res.status(200).json({
            message: "profile",
            user: userObj,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in fetching profile!"
        })
    }
}

module.exports = {
    getCurrentUser,
}