exports.up = async (knex) => {
  return knex.schema.alterTable('platforms', function (table) {
    // english
    table.string('platform_english_name')
    // slug
    table.string('platform_slug')
  })
}

exports.down = async function (knex) {

}
