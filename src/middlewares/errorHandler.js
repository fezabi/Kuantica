const apiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
    console.error('[ERROR]', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return apiResponse(res, statusCode, message);
};

module.exports = errorHandler;
