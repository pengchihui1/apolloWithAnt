const _ = require('lodash')

let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}

const uuid = generateUUID('10000000')

module.exports = async function (knex, ctx) {
  // 建立資料
  const usersDate = []
  //   创建一百个用戶
  for (let i = 0; i < 100; i++) {
    usersDate.push({
      id: uuid(),
      created_at: new Date(),
      name: `xiaohuihui${i}`,
      password: `huihui${i}`,
      email: `xiaohuihui${i}gmail.com`,
      is_admin: false
    })
  }

  // 資料庫操作
  await knex('users').insert([
    ...usersDate
  ])

  // 讀取資料
  const docs = await knex.select().table('users')

  // 返回
  ctx.users = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.id
    })
  }
}
