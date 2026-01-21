const marketingService = require('../services/marketing.service');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { marketingContactosSchema, marketingInversionSchema } = require('../validators/common.schema');

const getHealth = asyncHandler(async (req, res) => {
    await marketingService.getHealth();
    return apiResponse(res, 200, 'Marketing module is healthy');
});

const getFctContactosDiarios = asyncHandler(async (req, res) => {
    const validated = marketingContactosSchema.parse(req);
    const { limit, cursor, ...filters } = validated.query;

    const result = await marketingService.getFctContactosDiarios({ limit, cursor, filters });
    return apiResponse(res, 200, 'Contactos diarios fetched successfully', result.data, result.meta);
});

const getFctInversionDiaria = asyncHandler(async (req, res) => {
    const validated = marketingInversionSchema.parse(req);
    const { limit, cursor, ...filters } = validated.query;

    const result = await marketingService.getFctInversionDiaria({ limit, cursor, filters });
    return apiResponse(res, 200, 'Inversion diaria fetched successfully', result.data, result.meta);
});

module.exports = {
    getHealth,
    getFctContactosDiarios,
    getFctInversionDiaria,
};
