# paccurate

[![NPM](https://nodei.co/npm/paccurate.png)](https://nodei.co/npm/paccurate/)

[![NPM version](https://img.shields.io/npm/v/paccurate.svg)](https://www.npmjs.com/package/paccurate)
[![build](https://github.com/remarkablemark/paccurate/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/paccurate/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/paccurate/branch/master/graph/badge.svg?token=LQAQTQE0QI)](https://codecov.io/gh/remarkablemark/paccurate)

Node.js client library for [Paccurate](https://paccurate.io/) (see [demo](https://replit.com/@remarkablemark/paccurate)). The types are generated from [Paccurate Swagger v1.5.4](https://api.paccurate.io/static/api/1.5.4/swagger.yaml).

## Quick Start

```ts
import { pack } from 'paccurate'

const data = await pack({
  key: 'YOUR_API_KEY',
  itemSets: [
    {
      refId: 0,
      dimensions: { x: 5.5, y: 6, z: 6 },
      quantity: 3,
      weight: 4.5,
    },
  ],
  boxTypeSets: ['fedex'],
})

console.log(data)
```

## Documentation

See [Paccurate docs](https://docs.paccurate.io/) and [API docs](https://api.paccurate.io/docs/).

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Paccurate account](https://manage.paccurate.io/sign_up)

## Installation

[NPM](https://www.npmjs.com/package/paccurate):

```sh
npm install paccurate
```

[Yarn](https://yarnpkg.com/package/paccurate):

```sh
yarn add paccurate
```

## Usage

The package needs to be configured with your account's secret key:

```ts
const { Paccurate } = require('paccurate')

const paccurate = new Paccurate('YOUR_API_KEY')

paccurate
  .pack({
    // ...
  })
  .then((data) => console.dir(data, { depth: null }))
  .catch((error) => console.error(error.code, error.message))
```

The same can be done with ES Modules and async-await:

```ts
import { Paccurate } from 'paccurate'

const paccurate = new Paccurate('YOUR_API_KEY')

async function main() {
  try {
    const data = await pack({
      // ...
    })
    console.dir(data, { depth: null })
  } catch (error) {
    console.error(error.code, error.message)
  }
}

main()
```

TypeScript users can import the types:

```ts
import type { Body, Response } from 'paccurate'
```

## Release

Release is automated with [Release Please](https://github.com/googleapis/release-please).

## License

[MIT](https://github.com/remarkablemark/paccurate/blob/master/LICENSE)
