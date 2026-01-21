const apiResponse = (res, statusCode, message, data = null, meta = undefined) => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
        data,
    };

    if (meta) {
        response.meta = meta;
    }

    return res.status(statusCode).json(response);
};

module.exports = apiResponse;
