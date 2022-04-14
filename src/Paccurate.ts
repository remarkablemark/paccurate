import { post } from './request'
import type { Body } from './types'

export class Paccurate {
  private apiKey: string

  /**
   * @param apiKey - Paccurate API key.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Finds the optimal way to pack a shipment.
   *
   * @param body - Packing configuration.
   * @returns - Pack response.
   */
  pack(body: Body) {
    return post(body, {
      headers: {
        Authorization: `apikey ${this.apiKey}`,
      },
    })
  }
}
