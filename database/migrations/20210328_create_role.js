exports.up = async (knex) => {
  return knex.schema.createTable('roles', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.increments('seq_id')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    // 用戶id
    table.string('schooluser_id')
    // 權限
    table.string('role')
    // 模組
    table.string('module')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('roles')
  // dropTableIfExists 如果表存在 相应的删除表
}
