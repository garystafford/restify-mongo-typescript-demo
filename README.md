# Widget Service

_Work in progress..._

Example of a simple microservice, written with Node.js 8, Restify 6, Mongoose 4 for MongoDB, and Typescript 2.6. Orginal project structure based on [restify-typescript-seed](https://github.com/sulhome/restify-typescript-seed) GitHub project.

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

# test sample endpoint
curl http://localhost:3000/api/ping

# kill node process(es) on Windows
taskkill /F /IM node.exe
```

Import the supplied set of sample widget documents into the local development instance of MongoDB from the supplied 'data/widgets.json' file.

```bash
NODE_ENV=development grunt mongoimport --verbose
```

