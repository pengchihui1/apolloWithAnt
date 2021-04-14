const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const createWordStatistic = async (args) => {
  const knex = db()
  const {
    wordId,
    status
  } = args.input
  return knex('word')
    .returning('*')
    .insert({
      id: uuidv4,
      word_id: wordId,
      created_at: new Date(),

      status
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
  createWordStatistic,
  editWordStatistic
}
