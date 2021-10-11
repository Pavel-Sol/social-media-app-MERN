const router = require('express').Router();
const {
  createConversation,
  getConversationOfOneUser,
} = require('./../controllers/conversation.controllers');

//new conv
router.post('/', createConversation);

//get conv of a user
router.get('/:userId', getConversationOfOneUser);

module.exports = router;
