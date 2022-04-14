import { post } from './request'
import type { Body } from './types'

/**
 * Finds the optimal way to pack a shipment.
 *
 * @param body - Packing configuration.
 * @returns - Pack response.
 */
export function pack(body: Body) {
  return post(body)
}
