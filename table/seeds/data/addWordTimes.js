const _ = require('lodash')

let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}

const uuid = generateUUID('50000000')

function DateAdd (interval, number, date) {
  switch (interval) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number)
      return date
      break
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3)
      return date
      break
    }
    case 'm': {
      date.setMonth(date.getMonth() + number)
      return date
      break
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7)
      return date
      break
    }
    case 'd': {
      date.setDate(date.getDate() + number)
      return date
      break
    }
    case 'h': {
      date.setHours(date.getHours() + number)
      return date
      break
    }
    case 'm ': {
      date.setMinutes(date.getMinutes() + number)
      return date
      break
    }
    case 's ': {
      date.setSeconds(date.getSeconds() + number)
      return date
      break
    }
    default: {
      date.setDate(date.getDate() + number)
      return date
      break
    }
  }
}

const now = new Date()
// 加五天.
const newDate = DateAdd('d ', 5, now)
// console.log(newDate)
// 加两个月.
// newDate = DateAdd('m ', 2, now)
// 加一年
// newDate = DateAdd('y ', 1, now)

module.exports = async function (knex, ctx) {
  // 建立資料
  const wordTimeData = []
  //   创建一百个单词
  for (let i = 0; i < 100; i++) {
    wordTimeData.push({
      id: uuid(),
      created_at: new Date(),
      start_date: new Date(),
      end_date: newDate,
      challenge_time: 15
    })
  }

  // 資料庫操作
  await knex('word_time').insert([
    ...wordTimeData
  ])

  // 讀取資料
  const docs = await knex.select().table('word_time')
  // 返回
  ctx.wordTimes = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.seq_id
    })
  }
}
