const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const foodPartnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
       type: String,
        required: true, 
    }
},
{
    timestamps: true,
}
)

foodPartnerSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcryptjs.hash(this.password, 10);
});

foodPartnerSchema.methods.comparePass = async function(password){
    const pass =  bcryptjs.compare(password, this.password);
    return pass;
}

foodPartnerSchema.methods.generateToken = function(){
    let token = jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}

const foodPartnerModel = mongoose.model("FoodPartner", foodPartnerSchema);

module.exports = foodPartnerModel;