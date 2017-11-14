# Restify-Mongoose-TypeScript Microservice

_Work in progress..._

Example of a simple microservice, written with Node.js 8.x, Restify 6.x, Mongoose 4.x for MongoDB, and Typescript 2.6. Original project structure based on [restify-typescript-seed](https://github.com/sulhome/restify-typescript-seed) GitHub project.

Project built in Visual Studio 2017 on Windows using the TypeScript Node.js template.

## Working with Project

```bash
# recommend using yarn instead of npm
npm install -g yarn

# install node packages
yarn
yarn install

# install typescript globally
yarn global add typescript
tsc --version # 2.6.1

# build continuously
tsc --watch

# transpile typescript
yarn run compile

# mocha for testing
yarn global add mocha

# test (transpiles first)
yarn test

# start (transpiles first)
yarn start

# test local HTTP GET endpoint
curl http://localhost:3000/widgets

# kill node process(es) on Windows
taskkill /F /IM node.exe
```

Import the supplied set of sample widget documents into the local development instance of MongoDB from the supplied 'data/widgets.json' file.

```bash
# windows
SET MONGO_URL=localhost:27017
SET MONGO_USERNAME=<your_username>
SET MONGO_PASSWORD=<your_password>

mongoimport ^
  --host %MONGO_URL% ^
  --username %MONGO_USERNAME% ^
  --password %MONGO_PASSWORD% ^
  --authenticationDatabase admin ^
  --db node-restify-mongodb-development ^
  --collection widgets ^
  --file data/widgets.json ^
  --drop --jsonArray --verbose
```