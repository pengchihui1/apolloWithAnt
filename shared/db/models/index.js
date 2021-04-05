const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const { db } = require('../knex')

// 查询todo的数据
const getTodos = async () => {

  const knex = db()
  
  return knex
    .select('*')
    .from('todos')
    .then(function (rows) { return rows })// console.log(rows)
    .catch(function (error) { return error }) // console.error(error)
}

module.exports = {
    getTodos
}