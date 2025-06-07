    const express = require('express');
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsdoc = require('swagger-jsdoc');
    const fs = require('fs');

    const app = express();
    const port = 3000;

    // Load JSON data
    const jsonData = JSON.parse(fs.readFileSync('../../../data/countries.json', 'utf-8'));
    const jsonDataContinents = JSON.parse(fs.readFileSync('../../../data/continents.json', 'utf-8'));

    // Swagger configuration
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Simple JSON Service API',
                version: '1.0.0',
                description: 'A simple Node.js service using JSON data with Swagger documentation.'
            },
        },
        apis: ['./service.js'], // Path to the file containing the API documentation
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    // API endpoint to get all data
    /**
     * @swagger
     * /countries:
     *   get:
     *     summary: Get all countries data
     *     description: Returns all the countries data from the JSON file.
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   code:
     *                     type: string
     *                   name:
     *                     type: string
     *                   capital:
     *                     type: string
     *                   currency:
     *                     type: string
     *                   phone:
     *                     type: string
     * /continents/{continentcode}/countries:
     *   get:
     *     summary: Get all states for a given country data
     *     parameters:
     *      - in: path
     *        name: continentcode
     *        type: string
     *        required: true
     *     description: Returns all the states for a given countries from the JSON file.
     *     responses:
     *       200:
     *         description: Successful response     
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   code:
     *                     type: string
     *                   name:
     *                     type: string
     *                   counitries:
     *                      type: array
     *                      items:
     *                        type: object
     *                        properties:
     *                          code:
     *                            type: string
     *                          name:
     *                            type: string     
     */
    app.get('/countries', (req, res) => {
        res.json(jsonData);
    });

  
    app.get('/continents/:continentcode/countries', (req, res) => {    
        console.log('continentCode is -', req.params);
         const continentCode = req.params.continentcode;
        const continent = jsonDataContinents.find(c => c.code === continentCode);   
        res.json( continent ? continent.countries : []);
    });

    // Swagger UI route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log(`Swagger UI is available on http://localhost:${port}/api-docs`);
    });