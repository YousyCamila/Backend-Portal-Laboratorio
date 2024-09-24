const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de gestión de ordenes de laboratorio', // Título para la documentación
    version: '1.0.0', // Versión de la API
    description: 'Documentación de la API para la gestión de ordenes de laboratorio', // Descripción
  },
  servers: [
    {
      url: 'http://localhost:3000/api/', // Cambia esto por la URL de tu servidor
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    
    {
      name: 'Pacientes',
      description: 'Operaciones relacionadas con los pacientes'
    },
    {
      name: 'Profesionales',
      description: 'Operaciones relacionadas con los profesionales',
    },

    {
        name: 'Grupo',
        description: 'Operaciones relacionadas con el grupo de las ordenes',
      },
      
    {
      name: 'Orden',
      description: 'Operaciones relacionadas con las ordenes',
    },
    
    {
      name: 'Procedimientos',
      description: 'Operaciones relacionadas con los procedimientos',
    },
    
    {
      name: 'Resultados',
      description: 'Operaciones relacionadas con los resultados',
    },

  ],

};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports={
  swaggerUi,
  swaggerSpec,
};