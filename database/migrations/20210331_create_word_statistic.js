exports.up = async (knex) => {
  return knex.schema.createTable('word_statistics', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.increments('seq_id')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    // 单词id
    table.string('word_id')
    // 是否过关
    table.boolean('status')
  })
}

exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists('word_statistics')
}
