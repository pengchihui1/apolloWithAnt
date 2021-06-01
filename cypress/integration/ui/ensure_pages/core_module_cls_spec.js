import _ from 'lodash'

describe('[確定頁面] cls模組', () => {
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

            cy.db('getClassesByDashboardId', currentDashboard.id)
              .then(classes => {
                currentDashboard.classes = classes
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

  it('[/1/dashboards/1/classes/1] 班級頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const cls = dashboard.classes[0]
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/classes/${cls.seq_id}`)
        cy.contains('幼兒甲')
      })
    })
  })

  it('[/1/dashboards/1/classes/1/edit] 編輯班級頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const cls = dashboard.classes[0]
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/classes/${cls.seq_id}/edit`)
        cy.contains('編輯')
      })
    })
  })

  it('[/1/dashboards/1/classes/1/members/edit] 編輯班級成員頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        const cls = dashboard.classes[0]
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/classes/${cls.seq_id}/members/edit`)
        cy.contains('編輯')
      })
    })
  })
})
