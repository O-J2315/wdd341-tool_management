const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {   
    title: 'Tool Management API',
    description: 'API documentation for managing hand and power tools',
    },
    host: 'https://wdd341-tool-management.onrender.com',
    schemes: ['http','https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js'); // Start the server after generating the documentation
}).catch(err => {
  console.error('Error generating Swagger documentation:', err);
});