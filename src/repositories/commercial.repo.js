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
}

module.exports = new CommercialRepository();
