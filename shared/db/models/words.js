const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')
const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')

const getWords = async () => {
  const knex = db()
  return knex.select('*').from('words')
}

const getLimitWords = async ({ first = 20, after = 0, filter = {} }) => {
  const knex = db()
  const {
    // word = null,
    // wordAt = null,
    // translation = null,
    // pronunciation = null,
    startAt = null,
    endAt = null
  } = filter

  return knex('words')
    .whereNull('deleted_at')
    // .andWhere({
    //   word,
    //   word_data:wordAt,
    //   translation,
    //   pronunciation
    // })
    .andWhere(builder => {
      if (startAt && endAt) {
        return builder
          .where('start_at', '<', endAt)
          .andWhere('end_at', '>', startAt)
      }
    })
    .orderBy('created_at', 'desc')
    .offset(after)
    .limit(first)
}

const getWordsByDate = async (args) => {
  const knex = db()
  const { wordAt } = args
  // ${new Date(wordAt).toISOString().split('T')[0]}
  return knex('words')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere((builder) => {
      return builder.where('word_date', 'like', '%2014-04-17%')
    })
    .orderBy('created_at', 'desc')
}

const createWord = async (args) => {
  const knex = db()
  const {
    word,
    wordAt,
    translation,
    pronunciation
  } = args.input

  return knex('words')
    .returning('*')
    .insert({
      ...omitBy({
        word,
        word_date: wordAt || new Date(),
        translation,
        pronunciation
      }, isUndefined),
      created_at: new Date(),
      modified_at: null
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const editWord = async (args) => {
  const knex = db()
  const {
    id,
    word,
    wordAt,
    translation,
    pronunciation
  } = args.input

  return knex('words')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id
    })
    .update({
      modified_at: new Date(),
      word,
      word_date: wordAt,
      translation,
      pronunciation
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const deleteWord = async (id) => {
  const knex = db()
  return knex('words')
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
  getWords,
  getLimitWords,
  createWord,
  editWord,
  deleteWord,
  getWordsByDate
}
