/* eslint-disable no-console */
import logger from './logger';
import app from './app';
import {nextApp} from './nextApp';

const port = app.get('port');
const server = app.listen(port);

nextApp.prepare().then(() => {
    process.on('unhandledRejection', (reason, p) =>
        logger.error('Unhandled Rejection at: Promise ', p, reason)
    );

    server.on('listening', () =>
        logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
    );
});
