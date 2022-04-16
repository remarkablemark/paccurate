import type { definitions, paths } from './swagger'

export type Body = definitions['Pack']
export type Response = paths['/']['post']['responses']['200']['schema']
