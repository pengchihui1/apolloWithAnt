exports.up = async (knex) => {
  return knex.schema.alterTable('words', function (table) {
    //  对应的挑战时间
    table.string('word_time_id')
  })
}
exports.down = async function (knex) {

}
