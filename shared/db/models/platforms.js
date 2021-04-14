const { v4: uuidv4 } = require('uuid')
const { db } = require('../knex')

// 根据id查询
const getPlatformById = async (platformId) => {
  const knex = db()

  return knex('platforms')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id: platformId
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// 根据ids查询多条数据
const getPlatformByIds = async (ids = []) => {
  const knex = db()

  return knex('platforms')
    .whereNull('deleted_at')
    .andWhereRaw('array[seq_id::text, id::text] && ?', [ids])
}

// 创建
const createPlatform = async () => {
  const knex = db()

  return knex('platforms')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id: uuidv4,
      created_at: new Date()
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// 编辑
const updataPlatform = async (args) => {
  const knex = db()
  const {
    platformId
  } = args.input
  return knex('platforms')
    .returning('*')
    .update({
      platform_name: '',
      platform_english_name: '',
      platform_slug: '',
      modified_at: new Date()
    })
    .where({
      id: platformId
    })
    .then(rows => (rows.length ? rows[0] : null))
}

module.exports = {
  getPlatformById,
  getPlatformByIds,
  createPlatform,
  updataPlatform
}
