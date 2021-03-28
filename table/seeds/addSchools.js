const _ = require('lodash')

let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
const uuid = generateUUID('10000000')

module.exports = async function (knex, ctx) {
  // 建立資料
  const schools = [
    {
      id: uuid(),
      created_at: new Date(),
      name: '聖若瑟教區中學第一校',
      english_name: 'CDSJ1',
      slug: 'school-cdsj1',
      created_by: ctx.users.obj.comus.id,
      collection_id: 'school-cdsj1-dev',
      has_intelligence_module: false,
      has_assessment_module: true,
      // 健康模組
      has_health_module: false,
      // 通告模組
      has_notification_module: false,
      // 打卡密鑰
      token: '10000000-0000-0000-0000-000000000001'
    },
    {
      id: uuid(),
      created_at: new Date(),
      name: '聖若瑟教區中學第六校',
      english_name: 'CDSJ6',
      slug: 'school-cdsj6',
      created_by: ctx.users.obj.comus.id,
      collection_id: 'school-cdsj6-dev',
      has_intelligence_module: true,
      has_assessment_module: false,
      // 健康模組
      has_health_module: false,
      // 通告模組
      has_notification_module: false,
      // 打卡密鑰
      token: '10000000-0000-0000-0000-000000000002'
    },
    {
      id: uuid(),
      created_at: new Date(),
      name: '化地瑪聖母女子學校',
      english_name: 'FATIMA',
      slug: 'school-fatima',
      created_by: ctx.users.obj.comus.id,
      collection_id: 'school-fatima-dev',
      has_intelligence_module: true,
      has_assessment_module: false,
      // 健康模組
      has_health_module: true,
      // 通告模組
      has_notification_module: false,
      // 輔導模組
      has_coach_module: true,
      // 打卡密鑰
      token: '10000000-0000-0000-0000-000000000003'
    },
    {
      id: uuid(),
      created_at: new Date(),
      name: '聖瑪大肋納學校',
      english_name: 'MADALENA',
      slug: 'school-madalena',
      created_by: ctx.users.obj.comus.id,
      collection_id: 'school-madalena-dev',
      has_intelligence_module: true,
      has_assessment_module: false,
      // 健康模組
      has_health_module: false,
      // 通告模組
      has_notification_module: true,
      // 打卡密鑰
      token: '10000000-0000-0000-0000-000000000004'
    },
    {
      id: uuid(),
      created_at: new Date(),
      name: '地域中學',
      english_name: 'REGION',
      slug: 'school-region',
      created_by: ctx.users.obj.comus.id,
      collection_id: 'school-region-dev',
      has_intelligence_module: true,
      has_assessment_module: true,
      // 健康模組
      has_health_module: true,
      // 通告模組
      has_notification_module: true,
      // 考勤模組
      has_attendance_module: true,
      // 成績表模組
      has_transcript_module: true,
      // 打卡密鑰
      token: '10000000-0000-0000-0000-000000000005'
    }
  ]

  // 資料庫操作
  await knex('schools').insert([
    ...schools
  ])

  // 讀取資料
  const docs = await knex.select().table('schools')

  // 返回
  ctx.schools = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.slug
    })
  }
}
