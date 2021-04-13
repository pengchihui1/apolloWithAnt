const { db } = require('../knex')

const createWordStatistic = async (args) => {
    const knex=db()
    const {
        wordDate,
        translation,
        pronunciation
    }=args.input
    return knex('word')
        .returning('*')
        .insert({
            id:uuidv4,
            created_at:new Date(),
            word_id,
            word_date:name,
            status
        })
        .then({
            return rows.length ? rows[0] : null
        })
}

const editWordStatistic = async (args) => {
    const knex=db()
    const {
        id
        wordId,
        wordDate,
        status
    }=args.input
    return knex('word')
        .returning('*')
        .insert({
            id:uuidv4,
            created_at:new Date(),
            word_id:wordId,
            word_date:nawordDateme,
            status
        })
        .then({
            return rows.length ? rows[0] : null
        })
}


module.exports = {
    createModule,
    editModule
}