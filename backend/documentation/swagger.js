const { Express, Request, Response } = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const version = require('../../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Microphones API Docs',
            version: version.version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./backend/routes/*.js', './backend/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    console.log(swaggerSpec);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs are avaible at: http://localhost:${port}/docs`);
}

module.exports = { swaggerDocs };
