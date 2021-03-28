module.exports = async function (knex) {
  // Deletes ALL existing entries
  // 刪除 所有資料

  await knex('users').truncate()
  await knex('schools').truncate()
  await knex('schoolusers').truncate()
  await knex('schools_dashboards').truncate()
}
