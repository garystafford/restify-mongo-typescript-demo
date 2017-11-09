# Widget Service

_Work in progress..._

Widget microservice, written with Node.js, Restify 6, Mongoose for MongoDB, and Typescript 2.x. Orginal project structure based on [restify-typescript-seed](https://github.com/sulhome/restify-typescript-seed) GitHub project.

## Working with Project

```bash
# recommend using yarn instead of npm
npm install -g yarn
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

