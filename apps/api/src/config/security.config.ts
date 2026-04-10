import { ConfigType, registerAs } from '@nestjs/config'

import { env, envNumber } from '~/global/env'

export const securityRegToken = 'security'

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtSecret: env('JWT_SECRET'), // 密钥
  jwtExprire: envNumber('JWT_EXPIRE'), // 过期时间
  refreshSecret: env('REFRESH_TOKEN_SECRET'), // 刷新密钥
  refreshExpire: envNumber('REFRESH_TOKEN_EXPIRE'), // 刷新过期时间
}))

export type ISecurityConfig = ConfigType<typeof SecurityConfig>
