import { describe, it } from 'node:test'

import assert from 'assert'

import { Paccurate, pack } from './index.mjs'

describe('index', () => {
  it('exports "Paccurate" class', () => {
    assert.strictEqual(typeof Paccurate, 'function')
  })

  it('exports "pack" function', () => {
    assert.strictEqual(typeof pack, 'function')
  })
})
