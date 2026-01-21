const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const requestLogger = require('./middlewares/requestLogger');
const authenticateToken = require('./middlewares/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Security and Utilities
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Healthcheck público (SIN auth)
app.get('/health', (req, res) => {
    console.log('healthcheck hit');
    res.status(200).send('ok');
});

// Authentication Middleware (Protects all routes below)
app.use(authenticateToken);

// Routes
app.use('/', routes);

// 404 Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
