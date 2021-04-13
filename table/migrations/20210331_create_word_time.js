exports.up = async (knex) => {
  return knex.schema.createTable('word_time', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.increments('seq_id')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    // 开始时间
    table.timestamp('start_date')
    // 结束时间
    table.timestamp('end_date')
    // 挑战时间
    table.integer('challenge_time')
  })
}

exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists('word_time')
}
