exports.up = async (knex) => {
  
    return knex.schema.alterTable('word_statistics', function (table) {
      //  对应用户id
      table.string('user_id')
    })
  }

    exports.down = async function (knex) {
    //    console.log(123)
    }
  