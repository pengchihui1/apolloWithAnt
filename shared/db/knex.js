const knex = require('knex')

// if something else isn't setting ENV, use development
const environment = process.env.NODE_ENV || 'development'
// require environment's settings from knexfile
const config = require('../../knexfile')[environment]

// if (!config.connection.user && environment === 'development' && config.connection.host.indexOf('aws') === -1) {
//   config.connection.user = 'admin'
// }

let cachedConnection

const db = () => {
  if (cachedConnection) {
    return cachedConnection
  }
  const connection = knex(config)
  cachedConnection = connection
  return connection
}

module.exports = {
  db
}
