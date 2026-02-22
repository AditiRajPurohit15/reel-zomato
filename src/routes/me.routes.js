const express = require('express');
const {UniversalAuthMiddleware} = require("../middleware/auth.middleware");
const {getCurrentUser} = require('../controller/me.controller');


const router = express.Router();

router.get('/me',UniversalAuthMiddleware,getCurrentUser);

module.exports = router;

