const reset = require('./data/reset')
const addWords = require('./data/addWords')
const addUsers = require('./data/addUsers')
const addWordTimes = require('./data/addWordTimes')

const ctx = {}

exports.seed = async function (knex) {
  // 刪除 schools 所有資料
  await reset(knex)

  // 新增 words
  await addWords(knex, ctx)
  // console.log('> added words:', ctx.words.docs.length)

  // 新增 users
  await addUsers(knex, ctx)
  // console.log('> added words:', ctx.users.docs.length)

  // 新增 users
  await addWordTimes(knex, ctx)
  // console.log('> added wordTimes:', ctx.wordTimes.docs.length)
}
