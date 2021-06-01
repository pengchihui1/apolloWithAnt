const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')

// 统计单词
const getWordSatistic = async (args) => {
  const knex = db()
  const {
    after = 10,
    first = 0,
    filter: {
      status = false
    }
  } = args
  return knex('word_statistics as t')
    .select('t.word_id', 't.status')
    .count('t.word_id as number')
    .joinRaw(`
          left join words as w
          on w.id::uuid = t.word_id::uuid
      `)
    .where({ 't.status': status })
    .whereNotNull('t.id')
    .whereNotNull('w.word')
    .whereNull('t.deleted_at')
    .groupBy('t.word_id', 't.status')
    .orderBy('number', 'desc')
    .offset(after)
    .limit(first)
}

const createWordStatistic = async (args) => {
  const knex = db()
  const {
    word_id,
    status
  } = args.input
  return knex('word_statistics')
    .returning('*')
    .insert({
      word_id: word_id,
      created_at: new Date(),
      status: status
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const editWordStatistic = async (args) => {
  const knex = db()
  const {
    wordId,
    status
  } = args.input
  return knex('word')
    .returning('*')
    .whereNull({ word_id: wordId })
    .updata({
      modifired: new Date(),
      status
    })
}

module.exports = {
  getWordSatistic,
  createWordStatistic,
  editWordStatistic
}
