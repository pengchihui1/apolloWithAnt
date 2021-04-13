exports.up = async (knex) => {
  return knex.schema.alterTable('roles', function (table) {
    table.string('user_id')
    table.string('platforms_id')
    table.string('module_id')
    table.dropColumn('schooluser_id')
    table.dropColumn('module')
  })
}

exports.down = async function (knex) {

}
