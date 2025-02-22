const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for the backend",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change if using a different port
        description: "Local server",
      },
      {
        url: "https://rk-consultants-server.vercel.app",
        description: "Prod Server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to API route files
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at http://localhost:3000/api-docs");
};

module.exports = swaggerDocs;
