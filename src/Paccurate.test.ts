import { Paccurate } from './Paccurate'
import { post } from './request'

const mockedPost = jest.mocked(post)
const apiKey = 'apiKey'
const body = { key: 'apikey' }
const data = { host: 'api.paccurate.io' }

jest.mock('./request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('Paccurate', () => {
  it('sends post request with body and returns response', async () => {
    const paccurate = new Paccurate(apiKey)
    expect(await paccurate.pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith(body, {
      headers: {
        Authorization: `apikey ${apiKey}`,
      },
    })
  })
})
