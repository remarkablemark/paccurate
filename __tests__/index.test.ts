import { Paccurate, pack } from '../src'

describe('Paccurate', () => {
  it('exports class', () => {
    expect(Paccurate).toBeInstanceOf(Function)
  })
})

describe('pack', () => {
  it('exports function', () => {
    expect(pack).toBeInstanceOf(Function)
  })
})
