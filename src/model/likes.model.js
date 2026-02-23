const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    food:{
        type: mongoose.Schema.ObjectId,
        ref: 'food',
        required:true,
    },
    
},{
    timestamps: true,
})

const like = mongoose.model('like', likeSchema);
module.exports = like;