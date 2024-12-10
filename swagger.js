
export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API',
      version: '1.0.0',
      description: `This is a REST API application made with Express..</br>
      <a href="${process.env.BaseURL}/swagger.json">{Swagger Json}</a>`
      
    },
    servers: [

      {
        url: `${process.env.BaseURL}`,
        description: `${process.env.NODE_ENV} server`,
      },
    ],
    // -------------------------------JWT Authentication------------------------
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    displayRequestDuration: true
  };
export const swaggerOptions = {
    swaggerDefinition,
    apis: [
      `${__dirname}/routes/*.js`,
      `${__dirname}/routes/user/*.js`,
    ],
    
  };
