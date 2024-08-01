import { post } from './request'
import type { Body } from './types'

export interface PackBody extends Body {
  key: string
}

/**
 * Finds the optimal way to pack a shipment.
 *
 * @param body - Packing configuration.
 * @param url - Paccurate API endpoint.
 * @returns - Pack response.
 */
export function pack(body: PackBody, url = 'https://api.paccurate.io/') {
  const key = body?.key
  // @ts-expect-error The operand of a 'delete' operator must be optional.
  delete body?.key
  return post(url, body, { headers: { Authorization: `apikey ${key}` } })
}
