import { ConfigType, registerAs } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

/**
 * @description 数据源配置
 */
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}
export const dbRegToken = 'database'


/**
 * @nestjs/config 里的这两个是做“类型安全配置”的核心工具：

registerAs：给一组配置命名并注册

你用它把配置包装成一个命名空间，例如 registerAs('database', () => ({ ... }))
这样配置键就变成 database.xxx，方便模块化管理
常用于 src/config/*.config.ts 这种文件里
ConfigType：从 registerAs 的配置工厂中推导 TS 类型

它是一个泛型工具类型：ConfigType<typeof databaseConfig>
可以拿到 databaseConfig 返回对象的精确类型，避免手写接口
常配合 @Inject(databaseConfig.KEY) 注入时使用，让 config.host、config.port 都有类型提示和检查
 */
export const DatabaseConfig = registerAs(
  dbRegToken,
  (): DataSourceOptions => dataSourceOptions,
)

export type IDatabaseConfig = ConfigType<typeof DatabaseConfig>