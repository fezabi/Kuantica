const config = require('../config/env');
const apiResponse = require('../utils/apiResponse');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <TOKEN>

    if (!token) {
        return apiResponse(res, 401, 'Access Denied: No Token Provided');
    }

    // Fail closed: If API_TOKEN is not configured, deny all access safely
    if (!config.apiToken) {
        console.error('SECURITY ERROR: API_TOKEN is not set in environment variables.');
        return apiResponse(res, 500, 'Internal Server Error: Security Configuration Error');
    }

    // Strict validation
    if (token !== config.apiToken) {
        return apiResponse(res, 403, 'Access Denied: Invalid Token');
    }

    next();
};

module.exports = authenticateToken;
