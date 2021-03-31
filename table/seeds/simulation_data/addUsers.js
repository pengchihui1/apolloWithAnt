const _ = require('lodash')

const { generateAdminUsers } = require('../data/users')

// 自定义长id
let i = 0
const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}

const uuid = generateUUID('00000000')

module.exports = async function (knex, ctx) {
  // 建立資料
  const users = []

  // 開發人員 admin
  users.push(
    ...generateAdminUsers(uuid)
  )

  // 資料庫操作
  const data = [...users]
  

  while (data.length) {

    console.log('add users data.length', data.length)

    const dataSplice = data.splice(0, 500)
    await knex('users').insert([...dataSplice])
  }

  // 讀取資料
  const docs = await knex.select().table('users')
  
  console.log("数据内容",docs)

  // const docs = await knex.select().table('users')
  // 返回
  ctx.users = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.name
    })
  }
}
