
exports.up = async (knex) => {
    return knex.schema.createTable('schools', function (table) {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
        table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
        table.timestamp('modified_at')
        table.timestamp('deleted_at')
        // 學校名字
        table.string('name')
        // 學校英文名字
        table.string('english_name')
        // 學校的slug
        table.string('slug')
        // 創建學校資料的user id
        table.string('created_by')
    })
}

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('schools')
}
