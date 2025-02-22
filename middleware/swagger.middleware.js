const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerUiAssetPath = require("swagger-ui-dist").absolutePath();
const path = require("path");
const express = require("express");
// Swagger definition
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

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
  app.use("/swagger-ui", express.static(swaggerUiAssetPath));

  app.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCssUrl: CSS_URL, // ✅ Ensure correct CSS loading
    })
  );
  console.log("Swagger Docs available at http://localhost:3000");
};

module.exports = swaggerDocs;
