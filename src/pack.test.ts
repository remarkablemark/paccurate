import { pack } from './pack'
import { post } from './request'
import type { Response } from './types'

const mockedPost = jest.mocked(post)
const body = { key: 'apikey' }
const data = { host: 'api.paccurate.io' } as Response

jest.mock('./request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('pack', () => {
  it('sends post request to default endpoint', async () => {
    expect(await pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith('https://api.paccurate.io/', body)
  })

  it('sends post request to cloud endpoint', async () => {
    expect(await pack(body, 'https://cloud.api.paccurate.io/')).toBe(data)
    expect(mockedPost).toBeCalledWith('https://cloud.api.paccurate.io/', body)
  })
})
