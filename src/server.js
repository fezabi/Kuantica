const app = require('./app');
const config = require('./config/env');
const { connectWithRetry } = require('./config/db');

const startServer = async () => {
    await connectWithRetry();

    app.listen(config.port, '0.0.0.0', () => {
        console.log(
            `Server running in ${config.nodeEnv} mode on port ${config.port}`
        );
    });
};

startServer();
