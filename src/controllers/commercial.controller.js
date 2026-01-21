const commercialService = require('../services/commercial.service');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { commercialFunnelSchema, commercialReservasSchema } = require('../validators/common.schema');

const getFunnelDiario = asyncHandler(async (req, res) => {
    const validated = commercialFunnelSchema.parse(req);
    const { limit, cursor, ...filters } = validated.query;

    const result = await commercialService.getFunnelDiario({ limit, cursor, filters });
    return apiResponse(res, 200, 'Funnel diario fetched successfully', result.data, result.meta);
});

const getReservasAtribuidas = asyncHandler(async (req, res) => {
    const validated = commercialReservasSchema.parse(req);
    const { limit, cursor, ...filters } = validated.query;

    const result = await commercialService.getReservasAtribuidas({ limit, cursor, filters });
    return apiResponse(res, 200, 'Reservas atribuidas fetched successfully', result.data, result.meta);
});

module.exports = {
    getFunnelDiario,
    getReservasAtribuidas,
};
