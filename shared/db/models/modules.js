/**
 *  @namespace Modules
 */

const { v4: uuidv4 } = require('uuid')
const { db } = require('../knex')

const createModule = async (args) => {
    const knex = db()
    const {
      name
    } = args.input
    return knex('modules')
      .returning('*')
      .insert({
        id:uuidv4,
        module_name:name
      })
      .then(rows => {
        return rows.length ? rows[0] : null
      })
  }

  const editModule = async (args) => {
    const knex = db()
    const {
      id
      name
    } = args.input

    return knex('modules')
      .returning('*')
      .andWhere({
          id
      })
      .updata({
        modified_at:new Date(),
        module_name:name
      })
      .then(rows => {
        return rows.length ? rows[0] : null
      })
  }


module.exports = {
    createModule,
    editModule
}
  

