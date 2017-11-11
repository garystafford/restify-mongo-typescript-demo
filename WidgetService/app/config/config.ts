export default class Config {

    private path = require('path');
    private rootPath = this.path.normalize(__dirname + '/..');

    private nodeEnv = process.env.NODE_ENV || 'development';
    private nodeHost = process.env.NODE_HOST || '127.0.0.1';
    private nodePort = process.env.NODE_PORT || 3000;

    private mongoHost = process.env.MONGO_HOST || '127.0.0.1';
    private mongoPort = process.env.MONGO_PORT || 27017;
    private logLevel = process.env.LOG_LEVEL || 'info';

    private appName = 'node-restify-mongodb-';
    private appVersion = '1.0.0';

    envSettings = {
        environment: this.nodeEnv,
        root: this.rootPath,
        app: {
            name: this.appName + this.nodeEnv,
            host: this.nodeHost,
            port: this.nodePort,
            version: this.appVersion
        },
        db: {
            name: this.appName + this.nodeEnv,
            host: this.mongoHost,
            port: this.mongoPort,
        },
        log: {
            name: this.appName + this.nodeEnv,
            level: this.logLevel
        }
    };
}