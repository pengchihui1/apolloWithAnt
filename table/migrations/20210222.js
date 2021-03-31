exports.up = async function (knex) {
  await knex.schema.createTable('todos', (table) => {
    table.increments('id')
    table.string('text').notNullable()
    table.boolean('done').notNullable()
  })

  await knex('todos').insert([
    { text: 'Buy milk', done: true },
    { text: 'Wash car', done: false },
    { text: 'Ling milk', done: true },
    { text: 'Wei car', done: false },
    { text: 'Kai milk', done: true },
    { text: 'Xiao car', done: false }
  ])
}

exports.down = async function (knex, Promise) {
  // await knex.raw('DROP TABLE todos CASCADE')
  // await knex.schema.dropTableIfExists('todos')
}
