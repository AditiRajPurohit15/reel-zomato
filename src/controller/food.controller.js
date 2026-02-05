const foodPartnerModel = require('../model/foodPartner.model')
const userModel = require('../model/auth.model')
const foodModel = require('../model/food.model');
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

module.exports = {
    createFood,
    getFoodItem,
}