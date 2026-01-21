const encodeCursor = (value) => {
    if (!value) return null;
    return Buffer.from(String(value)).toString('base64');
};

const decodeCursor = (cursor) => {
    if (!cursor) return null;
    try {
        return Buffer.from(cursor, 'base64').toString('ascii');
    } catch (error) {
        return null;
    }
};

module.exports = {
    encodeCursor,
    decodeCursor,
};
