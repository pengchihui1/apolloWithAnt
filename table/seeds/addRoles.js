const _ = require('lodash')

let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
const uuid = generateUUID('31000000')

module.exports = async function (knex, ctx) {
  // 權限
  // const roles = ['school-r', 'cls-r/w', 'self', 'non']

  // 模組
  const modules = ['attendance', 'student', 'notification', 'health', 'posts', 'assessment']

  // admin
  const schoolusersByAdmin = _.filter(ctx.schoolusers.docs, { is_admin: true })
  // teacher
  // const schoolusersByTeacher = _.filter(ctx.schoolusers.docs, { is_teacher: true })

  // 建立資料
  const rolesData = []

  // cypress 測試用的資料
  // rolesData.push({
  //   id: uuid(),
  //   created_at: new Date(),
  //   schooluser_id: ctx.schoolusers.obj.teacher1.id,
  //   role: 'cls-r/w',
  //   module: 'notification',
  //   school_id: ctx.schoolusers.obj.teacher1.school_id
  // })

  rolesData.push({
    id: uuid(),
    created_at: new Date(),
    schooluser_id: ctx.schoolusers.obj.srib.id,
    role: 'school-r/w',
    module: 'notification',
    school_id: ctx.schoolusers.obj.srib.school_id
  })

  rolesData.push({
    id: uuid(),
    created_at: new Date(),
    schooluser_id: ctx.schoolusers.obj.teacher21.id,
    role: 'school-r/w',
    module: 'notification',
    school_id: ctx.schoolusers.obj.teacher21.school_id
  })
  // cypress 測試用的資料

  // 管理員每個模組都是 'school-r/w'
  for (let i = 0; i < modules.length; i++) {
    schoolusersByAdmin.forEach(schooluser => {
      if (schooluser.username === 'region_non_role_robot') {
        rolesData.push({
          id: uuid(),
          created_at: new Date(),
          schooluser_id: schooluser.id,
          role: 'non',
          module: modules[i],
          school_id: schooluser.school_id
        })
      } else {
        rolesData.push({
          id: uuid(),
          created_at: new Date(),
          schooluser_id: schooluser.id,
          role: 'school-r/w',
          module: modules[i],
          school_id: schooluser.school_id
        })
      }
    })
  }

  rolesData.push(
    // 班主任有cls-c/w權限
    // {
    //   id: uuid(),
    //   created_at: new Date(),
    //   schooluser_id: ctx.schoolusers.obj.teacher1.id,
    //   role: 'cls-r/w',
    //   module: 'attendance'
    // },
    // 普通老師有cls-r/w權限
    // {
    //   id: uuid(),
    //   created_at: new Date(),
    //   schooluser_id: ctx.schoolusers.obj.teacher50.id,
    //   role: 'cls-r/w',
    //   module: 'attendance'
    // },
    // 輔導人員有school-r/w權限
    {
      id: uuid(),
      created_at: new Date(),
      schooluser_id: ctx.schoolusers.obj.attendanceAdmin1.id,
      role: 'school-r/w',
      module: 'attendance'
    }
  )

  // 老師隨機權限
  // for (let i = 0; i < modules.length; i++) {
  //   schoolusersByTeacher.map(schooluser => {
  //     const role = roles[parseInt(Math.random() * roles.length)]
  //     rolesData.push({
  //       id: uuid(),
  //       created_at: new Date(),
  //       schooluser_id: schooluser.id,
  //       role: role,
  //       module: modules[i]
  //     })
  //   })
  // }

  // 獲取化地瑪學校 id
  const school = ctx.schools.obj['school-fatima']
  // 獲取該校的老師
  const schoolusersAsTeacher = _.filter(
    ctx.schoolusers.docs,
    {
      school_id: school.id,
      is_teacher: true
    }
  )
  // 圖書館管理員
  const libraryAdmin = schoolusersAsTeacher.splice(1, 10)
  libraryAdmin.forEach(director => {
    rolesData.push({
      id: uuid(),
      created_at: new Date(),
      schooluser_id: school.id,
      role: 'library-r/w',
      module: 'library'
    })
  })

  // 輔導主任
  const coachDirector = schoolusersAsTeacher.splice(10, 1)
  // 輔導老師
  const coachTeacher = schoolusersAsTeacher.splice(11, 30)

  // 輔導主任權限
  coachDirector.forEach(director => {
    rolesData.push({
      id: uuid(),
      created_at: new Date(),
      schooluser_id: school.id,
      role: 'coach-r/a',
      module: 'coach'
    })
  })
  // 輔導老師權限
  coachTeacher.forEach(teacher => {
    rolesData.push({
      id: uuid(),
      created_at: new Date(),
      schooluser_id: school.id,
      role: 'coach-r/w',
      module: 'coach'
    })
  })

  // director 在 posts 有 school-r/w 的權限
  const directors = _.filter(ctx.schoolusers.docs, { is_director: true })
  directors.forEach(director => {
    const doc = _.find(rolesData, {
      schooluser_id: director.id,
      module: 'posts'
    })
    if (!doc) {
      rolesData.push({
        id: uuid(),
        created_at: new Date(),
        schooluser_id: director.id,
        role: 'school-r/w',
        module: 'posts',
        school_id: director.school_id
      })
    }
  })

  // 資料庫操作
  await knex('roles').insert([
    ...rolesData
  ])

  // 讀取資料
  const docs = await knex.select().table('roles')

  // 返回
  ctx.roles = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.id
    })
  }
}
