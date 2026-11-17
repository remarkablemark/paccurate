import type { Error, Pack, PostResponse } from './client'

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

export type Body = DeepPartial<Pack>
export type ErrorResponse = Error
export type Response = DeepPartial<PostResponse>
