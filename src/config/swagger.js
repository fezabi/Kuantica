const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kuantica API',
            version: '1.0.1',
            description: 'API documentation for Kuantica services including Commercial, Executive, and Marketing modules.',
        },
        servers: [
            {
                url: 'https://reportin-layer.zjp8znx82mwtt.us-east-1.cs.amazonlightsail.com',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                PaginationMeta: {
                    type: 'object',
                    properties: {
                        limit: { type: 'integer', example: 20 },
                        next_cursor: { type: 'string', nullable: true, example: 'Mw==' },
                        has_more: { type: 'boolean', example: true },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'integer', example: 400 },
                        message: { type: 'string', example: 'Error message' },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
