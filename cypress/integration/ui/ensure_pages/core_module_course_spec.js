import _ from 'lodash'

describe('[確定頁面] course模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-cdsj1')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }

        cy.db('getSchoolDashboardsBySchoolId', doc.id)
          .then(dashboards => {
            doc.dashboards = dashboards
            const currentDashboard = _.find(dashboards, { is_default: true })

            cy.db('getCoursesByDashboardId', currentDashboard.id)
              .then(courses => {
                currentDashboard.courses = courses
                return doc
              })
          })
      })
      .as('school_cdsj1')

    cy.db('getUserByEmail', 'comus.leong@gmail.com')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶')
        }
        return doc
      })
      .as('user_comus')
  })

  it('[/1/dashboards/1/courses/1] 課程頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const course = _.find(dashboard.courses, { name: '中文' })
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/courses/${course.seq_id}`)
        cy.contains('中文')
      })
    })
  })

  it('[/1/dashboards/1/courses/1/edit] 編輯課程頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const course = _.find(dashboard.courses, { name: '中文' })
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/courses/${course.seq_id}/edit`)
        cy.contains('編輯')
      })
    })
  })

  it('[/1/dashboards/1/courses/1/members/edit] 編輯課程成員頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const course = _.find(dashboard.courses, { name: '中文' })
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/courses/${course.seq_id}/members/edit`)
        cy.contains('編輯')
      })
    })
  })
})
