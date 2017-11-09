import * as fs from 'fs';
import * as restify from 'restify';
import mongoose = require('mongoose');

import configuration from './config/config';
import { logger } from './services/logger';

const config = new configuration();
const envSettings = config.envSettings;

export let server = restify.createServer({
    name: envSettings.app.name,
    version: envSettings.app.version
});

//restify.CORS.ALLOW_HEADERS.push('authorization');
//server.use(restify.CORS());
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.authorizationParser());

server.listen(envSettings.app.port, () => {
    logger.info(`INFO: Node app ${envSettings.app.name} is running at ${server.url}`);

    mongoose.Promise = global.Promise;
    var dbUrl = `mongodb://${envSettings.db.host}:${envSettings.db.port}`;
    mongoose.connect(dbUrl, { useMongoClient: true });
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    db.once('open', () => {
        logger.info(`INFO: MongoDB database ${envSettings.db.name} is running at ${dbUrl}`);
        fs.readdirSync(__dirname + '/routes').forEach((routeConfig: string) => {
            if (routeConfig.substr(-3) === '.js' && routeConfig !== 'index.js') {
                const route = require(__dirname + '/routes/' + routeConfig);
                route.routes(server);
            }
        });
    });
});