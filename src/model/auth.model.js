const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema =new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    }
},
{
    timestamps: true,
})


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePass =async function(password){
    const pass =await bcrypt.compare(password, this.password)
    return pass;
}

userSchema.methods.generateToken =function(){
   
let token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: '1d'});
return token;
}


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;