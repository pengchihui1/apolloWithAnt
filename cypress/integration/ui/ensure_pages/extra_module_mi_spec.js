import _ from 'lodash'

describe('[確定頁面] mi模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-region')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }
        cy.db('getSchoolDashboardsBySchoolId', doc.id)
          .then(dashboards => {
            doc.dashboards = dashboards
            const currentDashboard = _.find(dashboards, { is_default: true })

            cy.db('getClassesByDashboardId', currentDashboard.id)
              .then(classes => {
                currentDashboard.classes = classes
                return doc
              })
          })
      })
      .as('school-region')

    cy.db('getSchooluserBySchoolSlugAndEmail', 'school-region', 'comus.leong@gmail.com')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶?')
        }
        return doc
      })
      .as('schooluser_comus')

    cy.db('getSchooluserBySchoolSlugAndEmail', 'school-region', 'student236@student.region.edu.mo')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶?')
        }
        return doc
      })
      .as('schooluser_student236')
  })

  it('[/1/mi] 學校的智能分析頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/mi`)
        cy.contains('智能')
      })
    })
  })

  it('[/1/users/1/mi] 用戶的智能分析頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/users/${student.seq_id}/mi`)
          cy.contains('智能')
        })
      })
    })
  })

  it('[/1/dashboards/1/classes/1/mi] 班級的智能分析頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const cls = dashboard.classes[0]
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/classes/${cls.seq_id}/mi`)
        cy.contains('智能')
      })
    })
  })
})
