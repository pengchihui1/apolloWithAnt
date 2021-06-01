const { createDatabaseConnection } = require('../../modules/db/knex')

const modelFuncs = {
  ...require('../../modules/db/models/user'),
  ...require('../../modules/db/models/school'),
  ...require('../../modules/db/models/schooluser'),
  ...require('../../modules/db/models/schoolDashboard'),
  ...require('../../modules/db/models/cls'),
  ...require('../../modules/db/models/course'),
  ...require('../../modules/db/models/medicalRecord')
}

Object.keys(modelFuncs).forEach(function (key) {
  modelFuncs['db:' + key] = async (args) => {
    const db = createDatabaseConnection()
    const result = await modelFuncs[key](db, ...args)
    await db.destroy()
    return result
  }
})

module.exports = (on, config) => {
  on('task', {
    ...modelFuncs
  })
}
