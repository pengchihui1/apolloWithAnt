exports.up = async function (knex) {
  const all = await knex.select('*').from('todos')
  console.log('查询数据', all)
}

exports.down = async function (knex, Promise) {
  await knex.raw('DROP TABLE todos CASCADE')
}
