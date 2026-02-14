const express = require('express');
const {authUserMiddleware} = require('../middleware/auth.middleware');
const {getCurrentUser} = require('../controller/me.controller');


const router = express.Router();

router.get('/me',authUserMiddleware, getCurrentUser);

module.exports = router;

