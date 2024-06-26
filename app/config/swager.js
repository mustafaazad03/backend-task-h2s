const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "H2S - Task Management API",
			version: "1.0.0",
			description: "API documentation for the Task Management system - H2S",
		},
		servers: [
			{
				url: "https://backend-task-h2s.vercel.app/api",
				description: "Production server",
			},
			{
				url: "http://localhost:4004/api",
				description: "Development server",
			},
		],
	},
	apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
