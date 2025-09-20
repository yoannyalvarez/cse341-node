const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'A simple CRUD API to manage books and customer from the library'
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = './routes/index.js';

swaggerAutogen(outputFile, endpointsFiles, doc);