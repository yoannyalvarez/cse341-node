const express = require('express');
const router = express.Router();
const customersController =  require('../controllers/customers');
const { validatedCustomers, validate } = require('../helpers/validator.js');
const auth =  require('../middleware/authenticate.js');

router.get('/', customersController.getAll);
router.get('/:id', auth.isAuthenticated, customersController.getById);
router.post('/', auth.isAuthenticated, validatedCustomers(), validate, customersController.createCustomer);
router.put('/:id', auth.isAuthenticated, validatedCustomers(), validate, customersController.updateCustomer);
router.delete('/:id', auth.isAuthenticated, customersController.removeCustomer);

module.exports = router;