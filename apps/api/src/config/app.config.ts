import { env } from '~/global/env'

export const globalPrefix = env('GLOBAL_PREFIX', '')

export const RouterWhiteList: string[] = [
  `${globalPrefix ? '/' : ''}${globalPrefix}/auth/login`,
  `${globalPrefix ? '/' : ''}${globalPrefix}/auth/register`,
  `${globalPrefix ? '/' : ''}${globalPrefix}/auth/refresh`,
]