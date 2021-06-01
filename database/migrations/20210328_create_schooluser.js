
exports.up = async (knex) => {
  return knex.schema.createTable('schoolusers', function (table) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamp('modified_at')
    table.timestamp('deleted_at')

    table.string('name')
    table.string('email')
    table.string('profile_photo')
    table.string('user_id')
    table.string('username')
    table.string('google_provider_id')
    table.string('school_id')

    table.boolean('is_student').defaultTo(false)
    table.boolean('is_teacher').defaultTo(false)
    table.boolean('is_principal').defaultTo(false)
    table.boolean('is_admin').defaultTo(false)
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('schoolusers')
}
