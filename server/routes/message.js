const router = require('express').Router();
const MessageController = require('../controller/message');

router.get('/', MessageController.getMessages);
router.get('/with-user', MessageController.getMessagesWithUser);
router.post('/:contactId/send-otp', MessageController.sendOTP);

module.exports = router;