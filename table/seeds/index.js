const reset=require('./simulation_data/reset')
const addUsers=require('./simulation_data/addUsers')

const ctx = {}

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // 刪除 schools 所有資料
  await reset(knex)

  // 新增 users
  await addUsers(knex, ctx)
  console.log('added addUsers:', ctx.users.docs.length)
}