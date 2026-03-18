import type { components, paths } from './openapi'

export type Body = components['schemas']['Pack']
export type Response = paths['/']['post']['responses']['200']['content']['application/json']
