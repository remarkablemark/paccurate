import { pack } from './pack'
import { post } from './request'
import type { Response } from './types'

const mockedPost = jest.mocked(post)
const key = 'apikey'
const data = { host: 'api.paccurate.io' } as Response
const options = { headers: { Authorization: `apikey ${key}` } }

jest.mock('./request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('pack', () => {
  it('sends post request to default endpoint', async () => {
    const body = { key, boxTypeSets: ['fedex' as const] }
    expect(await pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith('https://api.paccurate.io/', body, options)
  })

  it('sends post request to cloud endpoint', async () => {
    const body = { key, boxTypeSets: ['fedex' as const] }
    expect(await pack(body, 'https://cloud.api.paccurate.io/')).toBe(data)
    expect(mockedPost).toBeCalledWith('https://cloud.api.paccurate.io/', body, options)
  })
})
