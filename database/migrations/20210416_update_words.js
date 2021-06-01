exports.up = async (knex) => {
  return knex.schema.alterTable('words', function (table) {
    //  推存状态
    table.boolean('status').defaultTo(false)
  })
}

exports.down = async function (knex) {

}
