exports.up = async (knex) => {
  // await knex.schema.dropTableIfExists('users')
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.increments('seq_id')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    // 用户名
    table.string('name')
    // 密码
    table.string('password')
  })
}

exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists('users')
}
