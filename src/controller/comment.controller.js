const userModel = require('../model/auth.model');
const foodModel = require('../model/food.model');
const commentModel = require('../model/comment.model');

async function postComment(req,res){
try {
    const foodId = req.params.foodId
    const food = await foodModel.findById(foodId);
    if(!food){
        return res.status(404).json({
            message: "food not found to comment on"
        })
    }
    let text = req.body.text;
    if(!text || !text.trim()){
        return res.status(400).json({
            message: "there is nothing to comment!"
        })
    }
    text=text.trim();
    
    const comment =await commentModel.create({
        text: text,
        user : req.user._id,
        food : req.params.foodId,
        parentComment: null
    })
    return res.status(201).json({
        message: "comment created successfully",
        comment
    })
} catch (error) {
    return res.status(500).json({
            message: "error in creating comment",
            error: error.message
        })
}
}

async function getComment(req,res){
try {
    const foodId = req.params.foodId
    const food = await foodModel.findById(foodId);
    if(!food){
        return res.status(404).json({
            message: "food not found to comment on"
        })
    }
    const comments = await commentModel.find({
        food:foodId,
        parentComment:null
    }).populate("user","fullName");
    return res.status(200).json({
        message: "food comments fetched!",
        comments
    })
} catch (error) {
    return res.status(500).json({
            message: "error in creating comment",
            error: error.message
        })
}
}

async function deleteComment(req,res){
try {
    const comment = await commentModel.findById(req.params.commentId);
    if(!comment){
        return res.status(404).json({
            message:"comment not found"
        })
    }
    if(comment.user.toString()!==req.user._id.toString()){
        return res.status(403).json({
            message:"you are not authorized to delete this comment!"
        })
    }
    await commentModel.findByIdAndDelete(req.params.commentId);
    return res.status(200).json({
        message:"comment deleted successfully",
    })
    
} catch (error) {
    return res.status(500).json({
            message: "error in deleting comment",
            error:error.message
        }) 
}
}

module.exports ={
    postComment,
    getComment,
    deleteComment
}