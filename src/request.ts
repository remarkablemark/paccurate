import type { RequestInit } from 'node-fetch'
import fetch from 'node-fetch'

import type { Body, Response } from './types'

const method = 'POST'
const url = 'https://api.paccurate.io/'

class ResponseError extends Error {
  constructor(public code: number, message: string) {
    super(message)
  }
}

/**
 * Sends a post request to Paccurate API.
 *
 * @param body - Packing configuration.
 * @param options - Request options.
 * @returns - Pack response.
 */
export async function post(body: Body, options?: RequestInit): Promise<Response> {
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
