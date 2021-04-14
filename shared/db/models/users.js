const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')
const { db } = require('../knex')

// 获得单个用户
const getUser = async (id) => {
  const knex = db()
  return knex('users')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id: id
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
  // 限定 input 欄位只有下面這些
  const {
    name = '',
    profilePhoto,
    email,
    isAdmin = false
  } = args.input

  return knex('users')
    .returning('*')
    .insert({
      ...omitBy({
        name,
        profile_photo: profilePhoto,
        email: email.toLowerCase(),
        is_admin: isAdmin
      }, isUndefined),
      modified_at: null,
      created_at: new Date()
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// const createOrFindUser = (user, providerMethod) => {
//   let promise
//   if (user.id) {
//     promise = getUserById(user.id)
//   } else if (user[providerMethod]) {
//     promise = getUserByIndex(providerMethod, user[providerMethod])
//       .then(storedUser => {
//         // 若找到存在於資訊庫的用戶
//         if (storedUser) {
//           return storedUser
//         }
//         // 不能根據 provider id 找到用戶, 從 email 入手再查多次

//         if (user.email) {
//           return getUserByEmail(user.email)
//         }
//         return Promise.resolve(null)
//       })
//   } else {
//     promise = Promise.resolve(null)
//   }

//   return promise
//     .then(storedUser => {
//       if (storedUser && storedUser.id) {
//         if (!storedUser[providerMethod]) {
//           return saveUserProvider(
//             storedUser.id,
//             providerMethod,
//             user[providerMethod]
//           ).then(() => Promise.resolve(storedUser))
//         } else {
//           return Promise.resolve(storedUser)
//         }
//       }
//       return storeUser(user)
//     })
//     .catch(err => {
//       if (user.id) {
//         console.error(err)
//         return null
//       }
//       return storeUser(user)
//     })
// }

module.exports = {
  getUser,
  getUserByIds,
  getUserByIndex,
  getUserByEmail,
  createUser
}
