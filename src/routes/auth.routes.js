const express = require('express');
const {registerController,
    loginController,
    logoutController,
    registerFoodPartnerController,
    loginFoodPartnerCOntroller,
    logoutFoodPartnerController,
} = require('../controller/auth.controllers')

const router = express.Router();

// user auth APIs
router.post('/register', registerController);
router.post("/login", loginController);
router.get('/logout', logoutController);

//food-partner APIs
router.post('/food-partner/register', registerFoodPartnerController);
router.post("/food-partner/login", loginFoodPartnerCOntroller);
router.get('/food-partner/logout', logoutFoodPartnerController);


module.exports = router;