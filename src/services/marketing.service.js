const marketingRepo = require('../repositories/marketing.repo');
const { encodeCursor, decodeCursor } = require('../utils/cursor');

class MarketingService {
    async getHealth() {
        return true;
    }

    async getFctContactosDiarios({ limit, cursor, filters }) {
        const cursorId = decodeCursor(cursor);

        if (cursor && !cursorId) {
            const error = new Error('Invalid cursor format');
            error.statusCode = 400;
            throw error;
        }

        const rows = await marketingRepo.getFctContactosDiarios({
            limit,
            cursorId: cursorId ? parseInt(cursorId, 10) : null,
            filters
        });

        return this._paginateResult(rows, limit); // id is default
    }

    async getFctInversionDiaria({ limit, cursor, filters }) {
        const cursorId = decodeCursor(cursor);

        if (cursor && !cursorId) {
            const error = new Error('Invalid cursor format');
            error.statusCode = 400;
            throw error;
        }

        const rows = await marketingRepo.getFctInversionDiaria({
            limit,
            cursorId: cursorId ? parseInt(cursorId, 10) : null,
            filters
        });

        return this._paginateResult(rows, limit, 'id_inversion');
    }

    _paginateResult(rows, limit, idField = 'id') {
        const hasMore = rows.length > limit;
        const data = hasMore ? rows.slice(0, limit) : rows;

        const lastItem = data[data.length - 1];
        const nextCursor = (hasMore && lastItem && lastItem[idField]) ? encodeCursor(lastItem[idField]) : null;

        return {
            data,
            meta: {
                limit,
                next_cursor: nextCursor,
                has_more: hasMore,
            }
        };
    }
}

module.exports = new MarketingService();
