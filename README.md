<div align="center">

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/jeffmant/clean-node-ts-api/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/jeffmant/clean-node-ts-api/tree/master) [![![Coverage Status](https://coveralls.io/repos/github/jeffmant/clean-node-ts-api/badge.svg?branch=master)](https://coveralls.io/github/jeffmant/clean-node-ts-api?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/jeffmant/clean-node-ts-api/badge.svg)](https://snyk.io/test/github/jeffmant/clean-node-ts-api) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/) [![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

</div>

# Clean Node Typescript

This repository is a template to using best practices on NodeJS projects with Typescript.

## Installation

First of all, please, create your .env file using the .env-example

Example:

```shell
npm install
```

## Usage

If you prefer to use Docker, just type:

```shell
npm run up
```

This command builds and up the api and mongodb containers using the docker-compose config.

And the same way to down the application:

```shell
npm run down
```

If you prefer to use without Docker, you'll need to have an instance of MongoDB running and put the URL at .env if it isn't the default (mongodb://localhost:27017/<db_name>)

### Build

This command builds the Typescript code to Javascript at /dist file.

```shell
npm run build
```

### Test

This command runs all tests of the current version:

```shell
npm test
```

You can run the unit tests with whatch mode:

```shell
npm run test:unit
```

Also, the integration tests with whatch mode:

```shell
npm run test:integration
```

### Start

This command executes the Javascript code from /dist/main/server.js

```shell
npm start
```

### Debug

To use the debug mode

```shell
npm run debug
```

### Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.
