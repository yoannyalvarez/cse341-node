const express = require('express');
const router = express.Router();
const booksController =  require('../controllers/books');
const { validatedBooks, validate } = require('../helpers/validator.js');
const auth =  require('../middleware/authenticate.js');

router.get('/', booksController.getAll);
router.get('/:id', auth.isAuthenticated, booksController.getById);
router.post('/', auth.isAuthenticated, validatedBooks(), validate, booksController.createBook);
router.put('/:id', auth.isAuthenticated, validatedBooks(), validate, booksController.updateBook);
router.delete('/:id', auth.isAuthenticated, booksController.removeBook);

module.exports = router;