const { Router } = require('express');
const router = Router();
const contactsController =  require('../controllers/contacts');


router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getById);

module.exports = { router };