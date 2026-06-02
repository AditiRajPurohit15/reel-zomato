const express = require('express');
const {authFoodPartnerMiddleware, authUserMiddleware} = require('../middleware/auth.middleware')
const {
  postComment,
  getComment,
  deleteComment,
  replyToComment,
  getReplies
} = require('../controller/comment.controller');

const router = express.Router();

router.post('/food/:foodId',authUserMiddleware,postComment)
router.get('/food/:foodId',authUserMiddleware,getComment)
router.delete('/:commentId',authUserMiddleware,deleteComment)
router.post('/reply/:commentId',authUserMiddleware,replyToComment)
router.get('/replies/:commentId',authUserMiddleware,getReplies)
module.exports = router;