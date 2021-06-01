const _ = require('lodash')

let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}

const wordTimeId = generateUUID('50000000')
const uuid = generateUUID('10000000')

module.exports = async function (knex, ctx) {
  // 建立資料
  const wordsDate = []
  //   创建一百个单词
  for (let i = 0; i < 100; i++) {
    wordsDate.push({
      id: uuid(),
      created_at: new Date(),
      word_date: new Date(),
      word: `word${i}`,
      translation: `单词${i}`,
      pronunciation: `[wo'd${i}]`,
      status: false,
      word_time_id: wordTimeId()
    })
  }

  // 資料庫操作
  await knex('words').insert([
    ...wordsDate
  ])

  // 讀取資料
  const docs = await knex.select().table('words')

  // 返回
  ctx.words = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.id
    })
  }
}
