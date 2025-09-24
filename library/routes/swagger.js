const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger-output.json');

router.use('/api-docs', () => {
    try {
        swaggerUi.serve // Middleware to serve Swagger UI assets
    } catch (error) {
        console.error('Failed to load Swagger UI', error);
    }
});
router.get('/api-docs', () => {
    try {
        swaggerUi.setup(swaggerDoc) // Middleware to set up Swagger UI with the generated documentation
    } catch (error) {
        console.error('Failed to set up Swagger UI', error);
    }
});

module.exports = router;