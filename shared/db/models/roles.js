/**
 * @namespace Role
 */

const { getKnex } = require('../knex')

const createRole = async (args) => {
  const knex = getKnex()
  const {
    schooluserId,
    schoolId,
    role,
    module
  } = args.input

  return knex('roles')
    .returning('*')
    .insert({
      schooluser_id: schooluserId,
      school_id: schoolId,
      role,
      module
    })
    .then(rows => {
      return rows.length ? rows[0] : null
    })
}

const editRole = async (args) => {
  const knex = getKnex()
  const {
    roleId,
    role
  } = args.input

  return knex('roles')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id: roleId
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
  const knex = getKnex()
  const {
    roleId
  } = args.input

  return knex('roles')
    .returning('*')
    .whereNull('deleted_at')
    .andWhere({
      id: roleId
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
  const knex = getKnex()
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
  const knex = getKnex()
  return knex('roles')
    .whereNull('deleted_at')
    .andWhere({ schooluser_id: schooluserId })
}

const getRolesBySchoolIdAndModule = (schoolId, module, { first = 99999, after = 0 }) => {
  const knex = getKnex()
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
  const knex = getKnex()
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
