const foodPartnerModel = require('../model/foodPartner.model')
const userModel = require('../model/auth.model')
const foodModel = require('../model/food.model');
const likeModel = require('../model/likes.model')
const saveModel = require('../model/save.model')
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

        return res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

    } catch (error) {
        return res.status(400).json({
            message: "error in creating food item",
            error: error
        })
    }
}

async function getFoodItem(req,res){ 
    try {
        let currentUser = req.user;
        const foods = await foodModel.find({});
        const foodIds = foods.map(food=>food._id);
        const foodPartnerId = foods.map(food=>food.foodPartner);
        
        const likes = await likeModel.find({
            food: {$in : foodIds},
            user: currentUser._id
        })
        const saves = await saveModel.find({
            food: {$in: foodIds},
            user: currentUser._id
        })
        const foodPartners = await foodPartnerModel.find({
            _id:{$in: foodPartnerId},
            
        })
        
        const likedFoodIds = new Set(likes.map(like=>like.food.toString()));
        const savedFoodIds = new Set(saves.map(save=>save.food.toString()));
        const partnerMap = new Map(foodPartners.map(partner=>[partner._id.toString(), partner.contactName]))
       
        
        const foodsWithLikes = foods.map(food=>({
            ...food._doc,
            isLiked:likedFoodIds.has(food._id.toString()),
            isSaved:savedFoodIds.has(food._id.toString()),
            foodPartnerNamee: partnerMap.get(food.foodPartner.toString())
        }))

        return res.status(200).json({
        message: "Food items fetched successfully",
        foods: foodsWithLikes
    })
    } catch (error) {
        return res.status(400).json({
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

async function saveFood(req,res){
    try {
        const {foodId} = req.body;
        const user = req.user;
        const isAlreadySaved = await saveModel.findOne({
            user:user._id,
            food:foodId
        })
        if(isAlreadySaved){
            await saveModel.deleteOne({
                user: user._id,
                food:foodId
            })
            await foodModel.findByIdAndUpdate(foodId,{
                $inc: {savesCount: -1}
            })
            return res.status(200).json({
                message:"food unsaved successfully"
            })
        }
        const save = await saveModel.create({
            user: user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{savesCount: 1}
        })
        return res.status(201).json({
            message:"food saved successfully",
            save
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in likeFood",
            error: error.message
        })
    }
}

async function getFoodForPartner(req,res){
try {
    let partnerId = req.foodPartner._id;
    const foodPartnerFeed = await foodModel.find({
        foodPartner: partnerId
    })
    return res.status(200).json({
        message: "get food feed by food Partner api called",
        foodPartnerFeed
    })
} catch (error) {
    return res.status(500).json({
        message: "error in get food by food Partner api",
    })
}
}

async function deleteFood(req,res){
    try {
        let foodId = req.params.id;
        const deletedFood = await foodModel.findByIdAndDelete({
            _id: foodId,
            foodPartner: req.foodPartner._id
        });
        if(!deletedFood){
            return res.status(404).json({
                message: "food not found or not authorized"
            });
        }
        return res.status(200).json({message:"food deleted successfully"})
    } catch (error) {
        return res.status(500).json({
            message: "error in deleting food"
        })
    }
}

async function getSavedFoodForUser(req, res) {
    try {
        let user = req.user;

        let foods = await saveModel.find({
            user: user._id
        });

        if (foods.length === 0) {
            return res.status(404).json({
                message: "No saved food found for this user",
                foods: []
            });
        }

        const foodIds = foods.map(f => f.food);

        const savedFood = await foodModel.find({
            _id: { $in: foodIds }
        }).select("name video description likeCount savesCount");

        // maintain order
        const foodMap = new Map();
        savedFood.forEach(food => {
            foodMap.set(food._id.toString(), food);
        });

        const orderedFoods = foodIds.map(id => foodMap.get(id.toString()));

        return res.status(200).json({
            message: "saved food fetched for user",
            foods: orderedFoods
        });

    } catch (error) {
        return res.status(500).json({
            message: "error in fetching users' saved food",
            error: error.message
        });
    }
}

module.exports = {
    createFood,
    getFoodItem,
    likeFood,
    saveFood,
    getFoodForPartner,
    deleteFood,
    getSavedFoodForUser
}