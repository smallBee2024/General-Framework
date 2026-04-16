// import { globalPrefix, RouterWhiteList } from './app.config'
import { DatabaseConfig } from './database.config'
import { SecurityConfig } from './security.config'

export * from './app.config'
export * from './database.config'
export * from './security.config'

export default {
    database: DatabaseConfig,
    security: SecurityConfig,
    // app: {
    //     globalPrefix,
    //     RouterWhiteList,
    // },
}