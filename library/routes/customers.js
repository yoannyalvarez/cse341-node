const express = require('express');
const router = express.Router();
const customersController =  require('../controllers/customers');
const { validatedCustomers, validate } = require('../helpers/validator.js');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getById);
router.post('/', validatedCustomers(), validate, customersController.createCustomer);
router.put('/:id', validatedCustomers(), validate, customersController.updateCustomer);
router.delete('/:id', customersController.removeCustomer);

module.exports = router;