const express = require('express');
const {authFoodPartnerMiddleware, authUserMiddleware} = require('../middleware/auth.middleware')
const {createFood, getFoodItem, likeFood} = require('../controller/food.controller')
const router = express.Router();
const multer = require ('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})


router.post('/',authFoodPartnerMiddleware,upload.single("video"),createFood)
router.get('/', authUserMiddleware, getFoodItem)
router.post('/like',authUserMiddleware ,likeFood)

module.exports = router;