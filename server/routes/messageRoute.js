const router = require('express').Router();
const { createMessage, getMessages } = require('./../controllers/message.controllers');

// create message
router.post('/', createMessage);

// get messages
router.get('/:conversationId', getMessages);

module.exports = router;
