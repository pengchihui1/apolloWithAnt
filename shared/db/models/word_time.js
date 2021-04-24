const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const getWordTime = async (args) => {
  const knex = db()
  return knex('word_time')
}

const getLimitWordTime = async ({ first = 20, after = 0 }) => {
  const knex = db()
  return knex('word_time')
    .whereNull('deleted_at')
    .orderBy('created_at', 'desc')
    .offset(after)
    .limit(first)
}

const creatWordTime = async (args) => {
  const knex = db()
  const {
    startAt,
    endAt,
    time
  } = args.input

  return knex('word_time')
    .returning('*')
    .insert({
      start_date: startAt,
      end_date: endAt,
      challenge_time: time
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const updateWordTime = async (args) => {
  const knex = db()
  const {
    id,
    startAt,
    endAt,
    time
  } = args.input
  return knex('word_time')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id
    })
    .update({
      modified_at: new Date(),
      start_date: startAt,
      end_date: endAt,
      challenge_time: time
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const deleteWordTime = async (args) => {
  const { id } = args.input
  const knex = db()
  return knex('word_time')
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
  getWordTime,
  creatWordTime,
  updateWordTime,
  deleteWordTime,
  getLimitWordTime
}
