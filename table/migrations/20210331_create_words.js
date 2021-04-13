exports.up = async (knex) => {
  return knex.schema.createTable('words', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.increments('seq_id')
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    // 单词日期
    table.timestamp('word_date')
    // 单词
    table.string('word')
    // 翻译
    table.string('translation')
    // 读音
    table.string('pronunciation')
  })
}

exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists('words')
}
