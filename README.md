# paccurate

[![NPM](https://nodei.co/npm/paccurate.png)](https://nodei.co/npm/paccurate/)

[![NPM version](https://img.shields.io/npm/v/paccurate.svg)](https://www.npmjs.com/package/paccurate)
[![build](https://github.com/remarkablemark/paccurate/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/paccurate/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/paccurate/branch/master/graph/badge.svg?token=LQAQTQE0QI)](https://codecov.io/gh/remarkablemark/paccurate)

Node.js client library for [Paccurate](https://paccurate.io/) (see [demo](https://replit.com/@remarkablemark/paccurate)). The types are generated from [Paccurate Swagger v1.5.7](https://api.paccurate.io/static/api/1.5.7/swagger.yaml).

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
    const data = await paccurate.pack({
      // ...
    })
    console.dir(data, { depth: null })
  } catch (error) {
    console.error(error.code, error.message)
  }
}

main()
```

### API Endpoint

The request can be sent to two endpoints:

| Endpoint                        | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| https://api.paccurate.io/       | 30-second timeout, best for real-time               |
| https://cloud.api.paccurate.io/ | 1 hour timeout, best for large, parallel batch jobs |

The default endpoint is https://api.paccurate.io/. To send to a different endpoint, you can:

1. Instantiate with endpoint:

   ```ts
   import { Paccurate } from 'paccurate'

   const paccurate = new Paccurate('YOUR_API_KEY', 'https://cloud.api.paccurate.io/')
   await paccurate.pack(data)
   ```

2. Call method with endpoint:

   ```ts
   import { Paccurate } from 'paccurate'

   const paccurate = new Paccurate('YOUR_API_KEY')
   await paccurate.pack(data, 'https://cloud.api.paccurate.io/')
   ```

3. Call function with endpoint:

   ```ts
   import { pack } from 'paccurate'

   await pack(data, 'https://cloud.api.paccurate.io/')
   ```

### TypeScript

The following types can be imported:

```ts
import type { Body, Response } from 'paccurate'
```

## Contributing

We encourage contributions! Check out the [contributing guide](https://github.com/remarkablemark/paccurate/blob/master/.github/CONTRIBUTING.md) on how to proceed.

## License

[MIT](https://github.com/remarkablemark/paccurate/blob/master/LICENSE)
