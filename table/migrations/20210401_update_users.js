exports.up = async (knex)=>{
    return knex.schema.alterTable('users', function (table) {
      table.string('profile_photo')
      table.string('email')
    })
}
   
exports.down = async function (knex) {
   
}
   