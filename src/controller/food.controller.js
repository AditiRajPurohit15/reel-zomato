const foodPartnerModel = require('../model/foodPartner.model')
const userModel = require('../model/auth.model')
const foodModel = require('../model/food.model');
const likeModel = require('../model/likes.model')
const {uploadFile} = require('../services/storage.service')
const { v4: uuid } = require("uuid")

async function createFood(req,res){
    try {
       const fileUploadResult = await uploadFile(req.file.buffer,uuid())

       const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
       })

        res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

    } catch (error) {
        res.status(400).json({
            message: "error in creating food item",
            error: error
        })
    }
}

async function getFoodItem(req,res){
    try {
        const foodItem = await foodModel.find({})
        res.status(200).json({
        message: "Food items fetched successfully",
        foodItem
    })
    } catch (error) {
        res.status(400).json({
            message: "error in fetching food items",
            error: error
        })
    }
}

async function likeFood(req,res){
    try {
        const {foodId} = req.body;
        const user= req.user; 

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        })
        if(isAlreadyLiked){
            await likeModel.deleteOne({
                user:user._id,
                food: foodId
            })
            await foodModel.findByIdAndUpdate(foodId,{
                $inc: {likeCount: -1}
            })
            return res.status(200).json({
                message: "food unliked successfully"
            })
        }
        const like = await likeModel.create({
            user: user._id,
            food: foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc : {likeCount: 1}
        })
        return res.status(201).json({
            message: "food liked successfully",
            like
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in likeFood",
            error: error.message
        })
    }
}

module.exports = {
    createFood,
    getFoodItem,
    likeFood
}