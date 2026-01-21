/**
 * Builds a WHERE clause and parameters array for SQL queries.
 * Handles exact matches and date ranges (_inicio >=, _fin <=).
 * @param {Object} filters - Key-value pairs of filters.
 * @param {Array} initialParams - Initial parameters array (default: []).
 * @param {number} startIndex - Starting index for parameter placeholders (default: 1).
 * @returns {Object} { whereClause: string, params: Array, nextIndex: number }
 */
const buildWhereClause = (filters, initialParams = [], startIndex = 1) => {
    const conditions = [];
    const params = [...initialParams];
    let index = startIndex;

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (key.endsWith('_inicio')) {
                const column = key.replace('_inicio', '');
                conditions.push(`${column} >= $${index}`);
            } else if (key.endsWith('_fin')) {
                const column = key.replace('_fin', '');
                conditions.push(`${column} <= $${index}`);
            } else {
                conditions.push(`${key} = $${index}`);
            }
            params.push(value);
            index++;
        }
    });

    const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
    return { whereClause, params, nextIndex: index };
};

module.exports = {
    buildWhereClause,
};
