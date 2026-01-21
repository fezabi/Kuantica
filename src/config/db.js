const { Pool } = require('pg');
const config = require('./env');

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl: {
        rejectUnauthorized: false, // Required for most hosted Postgres services like RDS
    },
});

// Test connection and retry
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const client = await pool.connect();
            console.log('Successfully connected to PostgreSQL');
            client.release();
            return true;
        } catch (err) {
            console.error(`Database connection failed (attempt ${i + 1}/${retries}):`, err.message);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
    console.error('Could not connect to database after multiple retries.');
    process.exit(1);
};

module.exports = {
    pool,
    connectWithRetry,
    query: (text, params) => pool.query(text, params),
};
