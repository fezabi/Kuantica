const { z } = require('zod');

const paginationSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
    }),
});

const commercialFunnelSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        fecha_dato_inicio: z.string().date().optional(),
        fecha_dato_fin: z.string().date().optional(),
        proyecto_id: z.coerce.number().int().optional(),
    }),
});

const commercialReservasSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        fecha_reserva_inicio: z.string().date().optional(),
        fecha_reserva_fin: z.string().date().optional(),
        proyecto_id: z.coerce.number().int().optional(),
        rut_cliente: z.string().optional(),
        estado_reserva: z.string().optional(),
    }),
});

const executiveReportSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        fecha_analisis_inicio: z.string().date().optional(),
        fecha_analisis_fin: z.string().date().optional(),
    }),
});

const marketingContactosSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        contacto_key: z.string().optional(),
        fecha_contacto_inicio: z.string().date().optional(),
        fecha_contacto_fin: z.string().date().optional(),
        proyecto_id: z.coerce.number().int().optional(),
        rut_cliente: z.string().optional(),
        es_nuevo_contacto: z.coerce.boolean().optional(),
    }),
});

const marketingInversionSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        fecha_inversion_inicio: z.string().date().optional(),
        fecha_inversion_fin: z.string().date().optional(),
        proyecto_id: z.coerce.number().int().optional(),
    }),
});

const commercialReservasPorMesSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().min(1).max(200).default(20),
        cursor: z.string().optional(),
        // Filters
        fecha_reserva_inicio: z.string().date().optional(),
        fecha_reserva_fin: z.string().date().optional(),
        proyecto_id: z.coerce.number().int().optional(),
        rut_cliente: z.string().optional(),
        estado_reserva: z.string().optional(),
    }),
});

module.exports = {
    paginationSchema,
    commercialFunnelSchema,
    commercialReservasSchema,
    commercialReservasPorMesSchema,
    executiveReportSchema,
    marketingContactosSchema,
    marketingInversionSchema,
};
