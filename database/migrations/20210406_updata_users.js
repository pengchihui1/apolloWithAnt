exports.up = async (knex) => {
  return knex.schema.alterTable('users', function (table) {
    //  is_admin
    table.boolean('is_admin').defaultTo(false).alter()
  })
}

exports.down = async function (knex) {

}
