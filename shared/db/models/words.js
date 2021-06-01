const { db } = require('../knex')
const omitBy = require('lodash/omitBy')
const isUndefined = require('lodash/isUndefined')

const getWordById = async (id) => {
  const knex = db()
  return knex('words')
    .whereNull('deleted_at')
    .andWhere({
      id
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const getWords = async () => {
  const knex = db()
  return knex.select('*').from('words')
}

const getLimitWords = async (args) => {
  const knex = db()
  const {
    first,
    after,
    filter: {
      startAt,
      endAt,
      search
    }
  } = args

  return knex('words')
    .whereNull('deleted_at')
    .andWhere(builder => {
      if (!!startAt && !!endAt && !search) {
        return builder
          .where('word_date', '<=', endAt)
          .andWhere('word_date', '>=', startAt)
      } else if (!!startAt && !!endAt && !!search) {
        return builder
          .orWhere(knex.raw('lower(word)'), 'like', knex.raw(`lower('%${search}%')`))
          .orWhere(knex.raw('lower(translation)'), 'like', knex.raw(`lower('%${search}%')`))
      }
    })
    .orderBy('seq_id', 'asc', 'created_at', 'asc')
    .offset(after)
    .limit(first)
}

const getWordsByTime = async (args) => {
  const knex = db()
  const {
    first,
    after,
    time
  } = args

  console.log(time.toISOString().split('T')[0])

  return knex('words')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere(builder => {
      if (time) {
        return builder
          .where(knex.raw('lower(word_date::text)'), 'like', knex.raw(`lower('%${time}%')`))
      }
    })
    .orderBy('created_at', 'desc')
    .offset(after)
    .limit(first)
}

const createWord = async (args) => {
  const knex = db()
  const {
    name,
    time,
    translation,
    pronunciation
  } = args.input

  return knex('words')
    .returning('*')
    .insert({
      ...omitBy({
        word: name,
        word_date: time,
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
  getWordsByTime,
  getWordById
}
