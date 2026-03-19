import type { components, paths } from './openapi'

type Primitive = bigint | boolean | null | number | string | symbol | undefined

type DeepPartial<T> = T extends Primitive
  ? T
  : T extends (infer U)[]
    ? DeepPartial<U>[]
    : T extends readonly (infer U)[]
      ? readonly DeepPartial<U>[]
      : {
          [K in keyof T]?: DeepPartial<T[K]>
        }

export type Body = DeepPartial<components['schemas']['Pack']>
export type ErrorResponse = components['schemas']['Error']
export type Response = DeepPartial<
  paths['/']['post']['responses']['200']['content']['application/json']
>
