export default class Config {

    private path = require('path');
    private rootPath = this.path.normalize(__dirname + '/..');

    private nodeEnv = process.env.NODE_ENV || 'development';
    private nodeHost = process.env.NODE_HOST || '127.0.0.1';
    private nodePort = process.env.NODE_PORT || 3000;

    private appName = process.env.APP_NAME || `node-restify-mongodb-${this.nodeHost}`;
    private appVersion = process.env.APP_VERSION || '1.0.0';

    private mongoConnect = process.env.MONGO_CONNECT || 'mongodb://localhost:27017';
    private logLevel = process.env.LOG_LEVEL || 'info';

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
            connection: this.mongoConnect
        },
        log: {
            level: this.logLevel
        }
    };
}