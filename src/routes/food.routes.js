const express = require('express');
const {authFoodPartnerMiddleware, authUserMiddleware} = require('../middleware/auth.middleware')
const {createFood, getFoodItem, likeFood, saveFood, getFoodForPartner, deleteFood, getSavedFoodForUser} = require('../controller/food.controller')
const router = express.Router();
const multer = require ('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})


router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFood)
router.get('/', authUserMiddleware, getFoodItem)
router.post('/like',authUserMiddleware ,likeFood)
router.post('/save',authUserMiddleware,saveFood)
router.get('/getFood',authFoodPartnerMiddleware,getFoodForPartner);
router.delete('/:id',authFoodPartnerMiddleware,deleteFood)
router.get('/getSavedFoodForUser',authUserMiddleware,getSavedFoodForUser)

module.exports = router;