const { query } = require('../config/db');
const { buildWhereClause } = require('../utils/filterUtils');

class MarketingRepository {
    async checkHealth() {
        return true;
    }

    async getFctContactosDiarios({ limit, cursorId, filters }) {
        let sql = `SELECT * FROM marketing.fct_contactos_diarios`;

        const { whereClause, params, nextIndex } = buildWhereClause(filters);
        sql += whereClause;

        if (cursorId) {
            const connector = whereClause ? ' AND' : ' WHERE';
            sql += `${connector} contacto_key > $${nextIndex}`;
            params.push(cursorId);
        }

        const limitParamIndex = params.length + 1;
        sql += ` ORDER BY contacto_key ASC LIMIT $${limitParamIndex}`;
        params.push(limit + 1);

        const result = await query(sql, params);
        return result.rows;
    }

    async getFctInversionDiaria({ limit, cursorId, filters }) {
        let sql = `SELECT * FROM marketing.fct_inversion_diaria`;

        const { whereClause, params, nextIndex } = buildWhereClause(filters);
        sql += whereClause;

        if (cursorId) {
            const connector = whereClause ? ' AND' : ' WHERE';
            sql += `${connector} id_inversion > $${nextIndex}`;
            params.push(cursorId);
        }

        const limitParamIndex = params.length + 1;
        sql += ` ORDER BY id_inversion ASC LIMIT $${limitParamIndex}`;
        params.push(limit + 1);

        const result = await query(sql, params);
        return result.rows;
    }
}

module.exports = new MarketingRepository();
