// const { loadEnvConfig } = require('@next/env')
// const dev = process.env.NODE_ENV !== 'production'
// const { PG_URI } = loadEnvConfig('./', dev).combinedEnv

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.1.1' || 'localhost',
      user: 'postgres' || undefined,
      password: 'postgres' || undefined,
      database: 'postgres'
    },
    migrations: {
      directory: './table/migrations'
    },
    seeds: {
      directory: './table/seeds'
    },
    debug: true
  },
  production: {
    client: 'pg',
    connection: {
      host: '127.0.1.1' || 'localhost',
      user: 'postgres' || undefined,
      password: 'postgres' || undefined,
      database: 'postgres'
    },
    migrations: {
      directory: './table/migrations'
    },
    seeds: {
      directory: './table/seeds'
    }
  }

}
