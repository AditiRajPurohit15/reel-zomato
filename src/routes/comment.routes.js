const express = require('express');
const {authFoodPartnerMiddleware, authUserMiddleware} = require('../middleware/auth.middleware')
const {
  postComment,
  getComment,
  deleteComment,
} = require('../controller/comment.controller');

const router = express.Router();

router.post('/food/:foodId',authUserMiddleware,postComment)
router.get('/food/:foodId',authUserMiddleware,getComment)
router.delete('/:commentId',authUserMiddleware,deleteComment)

module.exports = router;