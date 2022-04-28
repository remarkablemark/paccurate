import { post } from './request'
import type { Body } from './types'

export class Paccurate {
  private apiKey: string
  private apiUrl: string

  /**
   * @param apiKey - Paccurate API key.
   * @param apiUrl - Paccurate API endpoint.
   */
  constructor(apiKey: string, apiUrl = 'https://api.paccurate.io/') {
    this.apiKey = apiKey
    this.apiUrl = apiUrl
  }

  /**
   * Finds the optimal way to pack a shipment.
   *
   * @param body - Packing configuration.
   * @param url - Paccurate API endpoint.
   * @returns - Pack response.
   */
  pack(body: Body, url = this.apiUrl) {
    return post(url, body, {
      headers: {
        Authorization: `apikey ${this.apiKey}`,
      },
    })
  }
}
