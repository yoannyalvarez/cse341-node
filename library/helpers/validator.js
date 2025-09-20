const { body, validationResult } = require('express-validator')

const validatedBooks = () => {
  return [
    body('tittle').notEmpty().withMessage('Tittle is required').isString(),
    body('author').notEmpty().withMessage('Author name is required').isString().not().isInt().withMessage('Author name must be a string'),
    body('genre').notEmpty().withMessage('Genre is required').isString(),
    body('number_of_pages').notEmpty().withMessage('Number of pages is required').isInt().withMessage('Number of pages must be an integer'),
    body('publication_date').notEmpty().withMessage('Publication date is required').matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Publication date should have the following format: MM/DD/YYYY'),
    body('category').notEmpty().withMessage('Category is required').isString(),
  ]
}

const validatedCustomers = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required').isString().not().isInt().withMessage('First name must be a string'),
    body('lastName').notEmpty().withMessage('Last name is required').isString().not().isInt().withMessage('Last name must be a string'),
    body('email').notEmpty().withMessage('Email is required').isEmail().normalizeEmail().withMessage('Email must be valid'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  validatedBooks,
  validatedCustomers,
  validate,
}