const { query } = require('../config/db');
const { buildWhereClause } = require('../utils/filterUtils');

class CommercialRepository {
    async getFunnelDiario({ limit, cursorId, filters }) {
        let sql = `SELECT * FROM commercial.fct_funnel_diario`;

        // Build base WHERE clause from filters
        const { whereClause, params, nextIndex } = buildWhereClause(filters);
        sql += whereClause;

        // Add Cursor condition
        if (cursorId) {
            const connector = whereClause ? ' AND' : ' WHERE';
            sql += `${connector} id_funnel > $${nextIndex}`;
            params.push(cursorId);
        }

        const limitParamIndex = params.length + 1;
        sql += ` ORDER BY id_funnel ASC LIMIT $${limitParamIndex}`;
        params.push(limit + 1);

        const result = await query(sql, params);
        return result.rows;
    }

    async getReservasAtribuidas({ limit, cursorId, filters }) {
        let sql = `SELECT * FROM commercial.fct_reservas_atribuidas`;

        const { whereClause, params, nextIndex } = buildWhereClause(filters);
        sql += whereClause;

        if (cursorId) {
            const connector = whereClause ? ' AND' : ' WHERE';
            sql += `${connector} reserva_id > $${nextIndex}`;
            params.push(cursorId);
        }

        const limitParamIndex = params.length + 1;
        sql += ` ORDER BY reserva_id ASC LIMIT $${limitParamIndex}`;
        params.push(limit + 1);

        const result = await query(sql, params);
        return result.rows;
    }
    async getReservasPorMes({ limit, filters }) {

        // Build base WHERE clause from filters, hacking to prefix with 'a.' to avoid ambiguity
        // Since buildWhereClause is generic, we might need to manually construct or use a subquery.
        // Let's try manual construction for safety given the JOINs.

        const params = [];
        const conditions = [];
        let index = 1;

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (key.endsWith('_inicio')) {
                        conditions.push(`a.${key.replace('_inicio', '')} >= $${index}`);
                    } else if (key.endsWith('_fin')) {
                        conditions.push(`a.${key.replace('_fin', '')} <= $${index}`);
                    } else {
                        conditions.push(`a.${key} = $${index}`);
                    }
                    params.push(value);
                    index++;
                }
            });
        }

        const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';

        const sql = `
            WITH total_reservas AS (
                SELECT 
                    proyecto_id,
                    canal_atribuido,
                    to_char(fecha_reserva, 'yyyy-mm') AS mes_reserva,
                    count(rut_cliente) AS total
                FROM commercial.fct_reservas_atribuidas
                GROUP BY 1,2,3
            )
            SELECT 
                a.proyecto_id,
                a.canal_atribuido,
                to_char(a.fecha_reserva, 'yyyy-mm') AS mes_reserva,
                a.estado_reserva,
                count(a.rut_cliente) AS cant_estado,
                count(a.rut_cliente)::numeric / NULLIF(b.total, 0) AS ratio_estado
            FROM commercial.fct_reservas_atribuidas a
            JOIN total_reservas b 
              ON a.proyecto_id = b.proyecto_id
             AND a.canal_atribuido = b.canal_atribuido
             AND to_char(a.fecha_reserva, 'yyyy-mm') = b.mes_reserva
            ${whereClause}
            GROUP BY
                a.proyecto_id,
                a.canal_atribuido,
                to_char(a.fecha_reserva, 'yyyy-mm'),
                a.estado_reserva,
                b.total
            LIMIT $${index};
        `;

        params.push(limit);

        const result = await query(sql, params);
        return result.rows;
    }
}

module.exports = new CommercialRepository();
