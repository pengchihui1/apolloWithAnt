const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const creatWordTime= async (args) => {
  const knex=db()
  const {
    startAt,
    endAt,
    time
  }=args.input
  return knex('word_time')
    .returning('*')
    .insert({
        id:uuidv4,
        module_name:name 
    })
}

const editWordTime=async (args) => {
    const knex=db()
    const{
        id,
        startAt,
        endAt,
        time
    }=args.input

    return knex('word_time')
    .returning('*')
   s
    .andWhere({
        id
    })
    .updata({
        modified_at:new Date(),
        start_date:startAt,
        end_date:endAt,
        challenge_time:time
    })
    .then(rows=>{
        return rows.length ? rows[0]:null
    })
}

const deleteWordTime=async (id) => {
    const knex=db()
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
    creatWordTime,
    editWordTime,
    deleteWordTime
}



