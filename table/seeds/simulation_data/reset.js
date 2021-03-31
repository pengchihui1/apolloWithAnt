module.exports = async function (knex) {
    // Deletes ALL existing entries
    // 刪除 schools 所有資料
  
    await knex('users').truncate()
  }
  