import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Matching Service API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, 
      },
    ],
  },
  apis: ["./src/routers/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`documention on http://localhost:${port}/docs`);
}

export default swaggerDocs;

