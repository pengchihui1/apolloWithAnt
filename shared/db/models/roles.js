const { db } = require('../knex')
const { v4: uuidv4 } = require('uuid')


// 创建权限用户
const createRole = async (args) => {
  const knex = db()
  const {
    userId,
    platformId,
    moduleId
    role,
  } = args.input
  return knex('roles')
    .returning('*')
    .insert({
      id: uuidv4,
      user_id: userId,
      platforms_id: platformId,
      modules_id: moduleId,
      role
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}
// 编辑用户权限
const editRole = async (args) => {
  const knex = db()
  const {
    roleId,
    role
  } = args.input

  return knex('roles')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id:roleId
    })
    .update({
      modified_at: new Date(),
      role
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const deleteRole = async (args) => {
  const knex = db()
  const {
    roleId
  } = args.input

  return knex('roles')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id:roleId
    })
    .update({
      deleted_at: new Date()
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

// 直接刪除db資料
const forceDeleteRole = async (args) => {
  const knex = db()
  const {
    roleId
  } = args.input

  return knex('roles')
    .where({
      id: roleId
    })
    .del()
}

const getRolesBySchooluserId = async (schooluserId) => {
  const knex = db()
  return knex('roles')
    .whereNull('deleted_at')
    .andWhere({ schooluser_id: schooluserId })
}

const getRolesBySchoolIdAndModule = (schoolId, module, { first = 99999, after = 0 }) => {
  const knex = db()
  return knex('roles as r')
    .whereNull('r.deleted_at')
    .andWhere({
      'r.school_id': schoolId,
      'r.module': module
    })
    .joinRaw(`
      inner join schoolusers as su
      on su.id::text = r.schooluser_id
      and su.deleted_at is null
      and su.archived_at is null
    `)
    .select('r.*')
    .orderByRaw('r.created_at desc, su.name asc')
    .offset(after)
    .limit(first)
}

const getRoleBySchooluserIdAndModule = async (schooluserId, module) => {
  const knex = db()
  return knex('roles')
    .whereNull('deleted_at')
    .andWhere({
      schooluser_id: schooluserId,
      module
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

module.exports = {
  createRole,
  editRole,
  deleteRole,
  forceDeleteRole,
  getRolesBySchooluserId,
  getRolesBySchoolIdAndModule,
  getRoleBySchooluserIdAndModule
}
