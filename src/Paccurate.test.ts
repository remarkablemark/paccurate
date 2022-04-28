import { Paccurate } from './Paccurate'
import { post } from './request'
import type { Response } from './types'

const mockedPost = jest.mocked(post)
const apiKey = 'apiKey'
const body = { key: 'apikey' }
const data = { host: 'api.paccurate.io' } as Response

jest.mock('./request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('Paccurate', () => {
  it('sends post request to default endpoint', async () => {
    const paccurate = new Paccurate(apiKey)
    expect(await paccurate.pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith('https://api.paccurate.io/', body, {
      headers: {
        Authorization: `apikey ${apiKey}`,
      },
    })
  })

  it('sends post request to cloud endpoint', async () => {
    const apiUrl = 'https://cloud.api.paccurate.io/'
    const paccurate = new Paccurate(apiKey, apiUrl)
    expect(await paccurate.pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith(apiUrl, body, {
      headers: {
        Authorization: `apikey ${apiKey}`,
      },
    })
  })
})
