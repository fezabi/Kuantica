const { query } = require('../config/db');
const { buildWhereClause } = require('../utils/filterUtils');

class ExecutiveRepository {
    async checkHealth() {
        return true;
    }

    async getRptGestionDiaria({ limit, cursorId, filters }) {
        let sql = `SELECT * FROM executive.rpt_gestion_diaria`;

        const { whereClause, params, nextIndex } = buildWhereClause(filters);
        sql += whereClause;

        if (cursorId) {
            const connector = whereClause ? ' AND' : ' WHERE';
            sql += `${connector} id_reporte > $${nextIndex}`;
            params.push(cursorId);
        }

        const limitParamIndex = params.length + 1;
        sql += ` ORDER BY id_reporte ASC LIMIT $${limitParamIndex}`;
        params.push(limit + 1);

        const result = await query(sql, params);
        return result.rows;
    }
}

module.exports = new ExecutiveRepository();
