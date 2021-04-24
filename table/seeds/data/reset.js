module.exports = async function (knex) {
  // 刪除 所有資料

  await knex('words').truncate()
  await knex('users').truncate()
  await knex('word_time').truncate()
}
