const router = require('express').Router();
const ContactController = require('../controller/contact');

router.get('/', ContactController.getContactList);
router.get('/:contactId', ContactController.getContactById);

module.exports = router;