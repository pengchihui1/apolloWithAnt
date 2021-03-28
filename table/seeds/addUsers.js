const _ = require('lodash')
const { generateCDSJ1StudentsUsers } = require('../data/cdsj1/cdsj1Students')
const { generateCDSJ1TeachersUsers } = require('../data/cdsj1/cdsj1Teachers')

const { generateCDSJ6StudentsUsers } = require('../data/cdsj6/cdsj6Students')
const { generateCDSJ6TeachersUsers } = require('../data/cdsj6/cdsj6Teachers')
const { generateCDSJ6GuardiansUsers } = require('../data/cdsj6/cdsj6Guardians')

const { generateFatimaStudentsUsers } = require('../data/fatima/fatimaStudents')
const { generateFatimaTeachersUsers } = require('../data/fatima/fatimaTeachers')
const { generateFatimaParamedicsUsers } = require('../data/fatima/fatimaParamedic')

const { generateMadalenaStudentsUsers } = require('../data/madalena/madalenaStudents')
const { generateMadalenaTeachersUsers } = require('../data/madalena/madalenaTeachers')
const { generateMadalenaParamedicsUsers } = require('../data/madalena/madalenaParamedic')

const { generateRegionStudentsUsers } = require('../data/region/regionStudents')
const { generateRegionTeachersUsers } = require('../data/region/regionTeachers')
const { generateRegionParamedicsUsers } = require('../data/region/regionParamedic')
const { generateRegionattendanceAdminsUsers } = require('../data/region/regionAttendanceAdmin')

const { generateAdminUsers } = require('../data/admin/users')

let i = 0
const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
const uuid = generateUUID('00000000')

module.exports = async function (knex, ctx) {
  // 建立資料
  const users = []

  // 開發人員 admin
  users.push(
    ...generateAdminUsers(uuid)
  )

  //  聖若瑟教區中學第一校
  users.push(
    ...generateCDSJ1StudentsUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'num', 'gender', 'id_no', 'card_no', 'edu_no', 'student_no', 'english_name', 'face_id', 'image_id']))
  )
  // 聖若瑟教區中學第六校
  users.push(
    ...generateCDSJ6StudentsUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'num', 'gender', 'id_no', 'card_no', 'edu_no', 'student_no', 'english_name', 'face_id', 'image_id']))
  )
  // 化地瑪聖母女子學校
  users.push(
    ...generateFatimaStudentsUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'num', 'gender', 'id_no', 'card_no', 'edu_no', 'student_no', 'english_name', 'face_id', 'image_id', 'archived_at', 'archived_reason']))
  )
  // 聖瑪大肋納學校
  users.push(
    ...generateMadalenaStudentsUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'num', 'gender', 'id_no', 'card_no', 'edu_no', 'student_no', 'english_name', 'face_id', 'image_id']))
  )

  users.push(
    ...generateRegionStudentsUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'num', 'gender', 'id_no', 'card_no', 'edu_no', 'student_no', 'english_name', 'face_id', 'image_id']))
  )
  // 聖若瑟教區中學第一校（老师）
  users.push(
    ...generateCDSJ1TeachersUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 聖若瑟教區中學第六校（老师）
  users.push(
    ...generateCDSJ6TeachersUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 六校家長
  users.push(
    ...generateCDSJ6GuardiansUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 化地瑪聖母女子學校（老師）
  users.push(
    ...generateFatimaTeachersUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 聖瑪大肋納學校（老師）
  users.push(
    ...generateMadalenaTeachersUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 地域中學（老師）
  users.push(
    ...generateRegionTeachersUsers(uuid).map(doc => _.omit(doc, ['cls', 'courses', 'face_id', 'image_id', 'is_director']))
  )

  // 地域中學（護理）
  users.push(
    ...generateRegionParamedicsUsers(uuid)
  )

  // 化地瑪聖母女子學校（護理）
  users.push(
    ...generateFatimaParamedicsUsers(uuid)
  )

  // 聖瑪大肋納學校（護理）
  users.push(
    ...generateMadalenaParamedicsUsers(uuid)
  )

  // 地域中學（輔導人員）
  users.push(
    ...generateRegionattendanceAdminsUsers(uuid)
  )

  // 資料庫操作
  const data = [...users]
  while (data.length) {
    console.log('add users data.length', data.length)

    const dataSplice = data.splice(0, 500)
    await knex('users').insert([...dataSplice])
  }

  // 資料庫操作
  // await knex('users').insert([
  //   ...users
  // ])

  // 讀取資料
  const docs = [...users]
  // const docs = await knex.select().table('users')

  // 返回
  ctx.users = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.username
    })
  }
}
