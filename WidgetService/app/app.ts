import * as fs from 'fs';
import * as restify from 'restify';
import bluebird = require('bluebird');
import mongoose = require('mongoose');
import corsMiddleware = require('restify-cors-middleware');

import configuration from './config/config';
import { logger } from './services/logger';

const config = new configuration();
const envSettings = config.envSettings;

export let server = restify.createServer({
    name: envSettings.app.name,
    version: envSettings.app.version
});

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional 
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.authorizationParser());

server.listen(envSettings.app.port, envSettings.app.host, () => {
    logger.info(`INFO: Node app ${envSettings.app.name} is running at ${server.url}`);
    const options = { useMongoClient: true, authSource: 'admin', promiseLibrary: bluebird };
    const dbUri = `${envSettings.db.connection}/${envSettings.app.name}`;
    mongoose.Promise = bluebird;
    mongoose.connect(dbUri, options);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    db.once('open', () => {
        logger.info(`INFO: MongoDB database ${envSettings.app.name} is running at ${envSettings.db.connection}`);
        fs.readdirSync(__dirname + '/routes').forEach((routeConfig: string) => {
            if (routeConfig.substr(-3) === '.js' && routeConfig !== 'index.js') {
                const route = require(__dirname + '/routes/' + routeConfig);
                route.routes(server);
            }
        });
    });
});