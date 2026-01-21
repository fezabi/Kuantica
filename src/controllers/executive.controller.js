const executiveService = require('../services/executive.service');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { executiveReportSchema } = require('../validators/common.schema');

const getHealth = asyncHandler(async (req, res) => {
    await executiveService.getHealth();
    return apiResponse(res, 200, 'Executive module is healthy');
});

const getRptGestionDiaria = asyncHandler(async (req, res) => {
    const validated = executiveReportSchema.parse(req);
    const { limit, cursor, ...filters } = validated.query;

    const result = await executiveService.getRptGestionDiaria({ limit, cursor, filters });
    return apiResponse(res, 200, 'Reporte gestion diaria fetched successfully', result.data, result.meta);
});

module.exports = {
    getHealth,
    getRptGestionDiaria,
};
