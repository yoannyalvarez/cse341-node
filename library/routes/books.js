const express = require('express');
const router = express.Router();
const booksController =  require('../controllers/books');
const { validatedBooks, validate } = require('../helpers/validator.js');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getById);
router.post('/', validatedBooks(), validate, booksController.createBook);
router.put('/:id', validatedBooks(), validate, booksController.updateBook);
router.delete('/:id', booksController.removeBook);

module.exports = router;