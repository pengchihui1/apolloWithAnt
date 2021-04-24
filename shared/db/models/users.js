const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const { db } = require('../knex')

// 获得单个用户
const getUser = async ({ search = {} }) => {
  const knex = db()
  const {
    id = null,
    name = null,
    password = null,
    email = null,
    isAdmin = false || ' '
  } = search
  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere(builder => {
      if (id) {
        return builder.where('id', id)
      } else if (name && password) {
        return builder.where('name', name).andWhere('password', password)
      } else if (email) {
        return builder.where('email', email)
      } else {
        return builder
          .where('is_admin', isAdmin)
          .orWhere('id', id)
          .orWhere('name', name)
          .orWhere('password', password)
          .orWhere('email', email)
      }
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}
// 获得多个用户
const getUserByIds = async (ids = []) => {
  const knex = db()
  return knex('users')
    .whereNull('deleted_at')
    .andWhereRaw('array[id::text] && ?', [ids])
}

/**
 * 基於名為 "indexKey" 的欄位 和 indexValue 的值去找一個 user doc
 * @memberof UserModel
 * @param {string} indexName indexName
 * @param {string} indexValue indexValue
 */
// 基於 indexKey 和 indexValue 去找一個 user doc
const getUserByIndex = (indexName, indexValue) => {
  const knex = db()
  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      [indexName]: indexValue
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// 根据 email 拿到user doc
const getUserByEmail = (email) => {
  const knex = db()
  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      email
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// 根據 args 創建新用戶
const createUser = async (args) => {
  const knex = db()
  const {
    name = null,
    password = null,
    profilePhoto,
    email,
    isAdmin = false
  } = args.input

  return knex('users')
    .returning('*')
    .insert({
      ...omitBy({
        name,
        password,
        profile_photo: profilePhoto,
        email: email.toLowerCase(),
        is_admin: isAdmin
      }, isUndefined),
      created_at: new Date(),
      modified_at: null
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}
const updateUser = async (args) => {
  const knex = db()
  const {
    id = null,
    name = null,
    password = null,
    profilePhoto,
    email,
    isAdmin = false
  } = args.input

  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id
    })
    .update({
      modified_at: new Date(),
      name,
      password,
      profile_photo: profilePhoto,
      email: email.toLowerCase(),
      is_admin: isAdmin
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const deleteUser = async (args) => {
  const knex = db()
  const { id } = args.input

  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id
    })
    .update({
      deleted_at: new Date()
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

module.exports = {
  getUser,
  getUserByIds,
  getUserByIndex,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
