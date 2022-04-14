import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

import { post } from './request'

jest.mock('node-fetch')

const mockedFetch = jest.mocked(fetch)
const body = {
  key: 'apikey',
}
const response = {
  json: jest.fn(),
  ok: true,
}
const data = {
  host: 'api.paccurate.io',
}

beforeEach(() => {
  response.json.mockClear()
  mockedFetch.mockClear()
  mockedFetch.mockReturnValueOnce(response as unknown as Promise<Response>)
  response.json.mockResolvedValueOnce(data)
})

describe('post', () => {
  describe('success', () => {
    it('sends a post request to Paccurate API with default options', async () => {
      expect(await post(body)).toBe(data)
      expect(mockedFetch).toBeCalledWith('https://api.paccurate.io/', {
        body: JSON.stringify(body),
        method: 'POST',
      })
      expect(response.json).toBeCalledTimes(1)
    })

    it('sends a post request to Paccurate API with custom options', async () => {
      const options = { headers: { Authorization: 'apikey' } }
      expect(await post(body, options)).toBe(data)
      expect(mockedFetch).toBeCalledWith('https://api.paccurate.io/', {
        body: JSON.stringify(body),
        method: 'POST',
        ...options,
      })
      expect(response.json).toBeCalledTimes(1)
    })
  })

  describe('error', () => {
    const errorData = {
      code: 400,
      message: 'EOF',
    }

    beforeAll(() => {
      mockedFetch.mockClear().mockReturnValueOnce({
        ...response,
        ok: false,
      } as unknown as Promise<Response>)
      response.json.mockClear().mockResolvedValueOnce(errorData)
    })

    it('responds with error message and code', async () => {
      const data = post(body)
      await expect(data).rejects.toBeInstanceOf(Error)
      await expect(data).rejects.toMatchObject(errorData)
      expect(mockedFetch).toBeCalledWith('https://api.paccurate.io/', {
        body: JSON.stringify(body),
        method: 'POST',
      })
      expect(response.json).toBeCalledTimes(1)
    })
  })
})
