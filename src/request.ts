import type { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'

import type { Body, Response } from './types'

class ResponseError extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message)
  }
}

const method = 'POST'

/**
 * Sends a post request to Paccurate API.
 *
 * @param url - API endpoint.
 * @param body - Packing configuration.
 * @param options - Request options.
 * @returns - Pack response.
 */
export async function post(url: string, body: Body, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method,
    ...options,
  })

  const data = await response.json()

  if (response.ok) {
    return data
  }

  throw new ResponseError(data.code, data.message)
}
