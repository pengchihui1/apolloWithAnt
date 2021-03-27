const debug = require('debug')('api:db:query')

// if something else isn't setting ENV, use development
const env = process.env.NODE_ENV || 'development'
// require environment's settings from knexfile
const config = require('../../knexfile')[env]

// 只有 localhost 將 user 指向為 admin, 需要事前 migration 時為 local 新增一個名為 "admin" 的 user
if (env === 'development') {
  config.connection.user = 'admin'
}

// 連線 db
const { Client } = require('pg')
const db = new Client(config.connection)
db.connect()

// db.insert
// https://stackoverflow.com/questions/35781510/how-to-update-a-table-only-if-the-values-passed-are-not-undefined-postgresql
db.insert = async (table, data) => {
  if (!table || typeof table !== 'string') {
    throw new Error("Parameter 'table' must be a non-empty string.")
  }
  if (!data || typeof data !== 'object') {
    throw new Error("Parameter 'data' must be an object.")
  }
  const keys = Object.keys(data).filter(k => data[k] !== undefined)
  const columns = keys.join(', ')
  const valuesAlias = keys.map((k, index) => '$' + (index + 1)).join(', ')
  const query = `INSERT INTO ${table}(${columns}) VALUES(${valuesAlias}) RETURNING *`
  const values = keys.map(k => data[k])
  return db.query(query, values)
}

db.delete = async (table, data) => {
  if (!table || typeof table !== 'string') {
    throw new Error("Parameter 'table' must be a non-empty string.")
  }
  if (!data || typeof data !== 'object') {
    throw new Error("Parameter 'data' must be an object.")
  }
  const keys = Object.keys(data).filter(k => data[k] !== undefined)
  const names = keys.map((k, index) => k + ' = $' + (index + 1)).join(' AND ')
  const query = `DELETE FROM ${table} WHERE ${names} RETURNING *`
  const values = keys.map(k => data[k])
  return db.query(query, values)
}

db.get = async (table, data, options = {}) => {
  if (!table || typeof table !== 'string') {
    throw new Error("Parameter 'table' must be a non-empty string.")
  }
  if (!data || typeof data !== 'object') {
    throw new Error("Parameter 'data' must be an object.")
  }
  const keys = Object.keys(data).filter(k => data[k] !== undefined)
  let i = 1
  const names = keys.map(k => {
    if (data[k] === null) {
      return k + ' IS NULL'
    }
    return k + ' = $' + (i++)
  }).join(' AND ')
  let query = `SELECT ${options.select || (options.count ? 'COUNT(*)' : '*')} FROM ${table} WHERE ${names} ${options.whereAnd ? (names ? 'AND' : '') + ' ' + options.whereAnd : ''}`
  const values = keys.map(k => data[k]).filter(val => val !== null)

  if (options.orderBy) {
    query += ` ORDER BY ${options.orderBy}`
  }
  if (options.limit) {
    query += ` LIMIT ${options.limit}`
  }
  if (options.offset) {
    query += ` OFFSET ${options.offset}`
  }

  debug('db.get', 'query', query)

  return db.query(query, values)
}

db.update = async (table, whereData, updateData) => {
  if (!table || typeof table !== 'string') {
    throw new Error("Parameter 'table' must be a non-empty string.")
  }
  if (!whereData || typeof whereData !== 'object') {
    throw new Error("Parameter 'whereData' must be an object.")
  }
  if (!updateData || typeof updateData !== 'object') {
    throw new Error("Parameter 'updateData' must be an object.")
  }

  let i = 1

  const updateKeys = Object.keys(updateData).filter(k => updateData[k] !== undefined)
  const updateNames = updateKeys.map(k => k + ' = $' + (i++)).join(', ')

  const whereKeys = Object.keys(whereData).filter(k => whereData[k] !== undefined)
  const whereNames = whereKeys.map(k => k + ' = $' + (i++)).join(' AND ')

  const query = `UPDATE ${table} SET ${updateNames} WHERE ${whereNames} RETURNING *`

  return db.query(query, [
    ...updateKeys.map(k => updateData[k]),
    ...whereKeys.map(k => whereData[k])
  ])
}

// 匯出 db client
module.exports = { db }
