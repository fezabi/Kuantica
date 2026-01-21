const apiResponse = require('../utils/apiResponse');

const notFound = (req, res, next) => {
    return apiResponse(res, 404, `Not Found - ${req.originalUrl}`);
};

module.exports = notFound;
