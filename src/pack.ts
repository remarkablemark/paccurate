import { post } from './request'
import type { Body } from './types'

/**
 * Finds the optimal way to pack a shipment.
 *
 * @param body - Packing configuration.
 * @param url - Paccurate API endpoint.
 * @returns - Pack response.
 */
export function pack(body: Body, url = 'https://api.paccurate.io/') {
  return post(url, body)
}
