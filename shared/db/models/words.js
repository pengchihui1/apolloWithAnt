const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const createWord = async (args) => {
    const knex=db()
    const {
        name,
        translation,
        pronunciation
    }=args.input
    return knex('word')
        .returning('*')
        .insert({
            id:uuidv4,
            created_at:new Date(),
            word:name,
            translation,
            pronunciation
    })
    .then(rows => {
        return rows.length ? rows[0] : null
    })
}

const editWord = async (args) => {
    const knex=db()
    const {
        id
        name,
        translation,
        pronunciation
    }=args.input

    return knex('word')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
        id
    })
    .update({ 
        modified_at:new Date(),
        name,
        translation,
        pronunciation
    })
    .then(rows => {
        return rows.length ? rows[0] : null
    })
}

const deleteWord = async (id) => {
    const knex=db()
    return knex('word')
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
    createWord,
    editWord,
    deleteWord
}