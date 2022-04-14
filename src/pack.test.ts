import { pack } from './pack'
import { post } from './request'

const mockedPost = jest.mocked(post)
const body = { key: 'apikey' }
const data = { host: 'api.paccurate.io' }

jest.mock('./request', () => ({
  post: jest.fn(),
}))

beforeEach(() => {
  mockedPost.mockClear()
  mockedPost.mockResolvedValueOnce(data)
})

describe('pack', () => {
  it('sends post request with body and returns response', async () => {
    expect(await pack(body)).toBe(data)
    expect(mockedPost).toBeCalledWith(body)
  })
})
