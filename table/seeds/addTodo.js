const _ = require('lodash')

await knex('todos').insert([
    { text: 'Buy milk', done: true },
    { text: 'Wash car', done: false },
    { text: 'Ling milk', done: true },
    { text: 'Wei car', done: false },
    { text: 'Kai milk', done: true },
    { text: 'Xiao car', done: false }
])