const executiveRepo = require('../repositories/executive.repo');
const { encodeCursor, decodeCursor } = require('../utils/cursor');

class ExecutiveService {
    async getHealth() {
        return true;
    }

    async getRptGestionDiaria({ limit, cursor, filters }) {
        const cursorId = decodeCursor(cursor);

        if (cursor && !cursorId) {
            const error = new Error('Invalid cursor format');
            error.statusCode = 400;
            throw error;
        }

        const rows = await executiveRepo.getRptGestionDiaria({
            limit,
            cursorId: cursorId ? parseInt(cursorId, 10) : null,
            filters
        });

        return this._paginateResult(rows, limit, 'id_reporte');
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

module.exports = new ExecutiveService();
