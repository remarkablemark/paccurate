import { pack, type Response } from '../src'
import { post } from '../src/request'

const mockedPost = jest.mocked(post)
const key = 'apikey'
const data = { host: 'api.paccurate.io' } as Response
const options = { headers: { Authorization: `apikey ${key}` } }

jest.mock('../src/request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('pack', () => {
  it('sends post request to default endpoint', async () => {
    const body = { key, boxTypeSets: ['customer' as const] }
    expect(await pack(body)).toBe(data)
    expect(mockedPost).toHaveBeenCalledWith(
      'https://api.paccurate.io/',
      { boxTypeSets: ['customer' as const] },
      options,
    )
  })

  it('sends post request to cloud endpoint', async () => {
    const body = { key, boxTypeSets: ['customer' as const] }
    expect(await pack(body, 'https://cloud.api.paccurate.io/')).toBe(data)
    expect(mockedPost).toHaveBeenCalledWith(
      'https://cloud.api.paccurate.io/',
      { boxTypeSets: ['customer' as const] },
      options,
    )
  })
})
