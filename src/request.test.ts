import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

import { post } from './request'

jest.mock('node-fetch')
const mockedFetch = jest.mocked(fetch)

const apiUrl = 'https://api.paccurate.io/'
const cloudApiUrl = 'https://cloud.api.paccurate.io/'

const body = { boxTypeSets: ['customer' as const] }

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
    it('sends a post request to API endpoint with default options', async () => {
      expect(await post(apiUrl, body)).toBe(data)
      expect(mockedFetch).toHaveBeenCalledWith(apiUrl, {
        body: JSON.stringify(body),
        method: 'POST',
      })
      expect(response.json).toHaveBeenCalledTimes(1)
    })

    it('sends a post request to API endpoint with custom options', async () => {
      const options = { headers: { Authorization: 'apikey' } }
      expect(await post(apiUrl, body, options)).toBe(data)
      expect(mockedFetch).toHaveBeenCalledWith(apiUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        ...options,
      })
      expect(response.json).toHaveBeenCalledTimes(1)
    })

    it('sends a post request to cloud API endpoint', async () => {
      const options = {}
      expect(await post(cloudApiUrl, body, options)).toBe(data)
      expect(mockedFetch).toHaveBeenCalledWith(cloudApiUrl, {
        body: JSON.stringify(body),
        method: 'POST',
      })
      expect(response.json).toHaveBeenCalledTimes(1)
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
      const data = post(apiUrl, body)
      await expect(data).rejects.toBeInstanceOf(Error)
      await expect(data).rejects.toMatchObject(errorData)
      expect(mockedFetch).toHaveBeenCalledWith('https://api.paccurate.io/', {
        body: JSON.stringify(body),
        method: 'POST',
      })
      expect(response.json).toHaveBeenCalledTimes(1)
    })
  })
})
