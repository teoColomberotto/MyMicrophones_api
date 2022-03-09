const { Express, Request, Response } = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const version = require('../../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Microphones API Documentation',
            version: version.version,
            description: "This is an academic purposes API for managing audio's microphones information.",
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
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
    apis: ['./backend/routes/*.js', './backend/models/*.js', './backend/documentation/jsdoc.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs are avaible at: http://localhost:${port}/docs`.cyan.underline);
}

module.exports = { swaggerDocs };
