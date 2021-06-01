import _ from 'lodash'

describe('[確定頁面] dashboard模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-cdsj1')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }

        cy.db('getSchoolDashboardsBySchoolId', doc.id)
          .then(dashboards => {
            doc.dashboards = dashboards
            return doc
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

  it('[/1/dashboard] 學年頁面 (轉址)', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        cy.visit(`${school.seq_id}/dashboard`)
        // 轉址
        const dashboard = _.find(school.dashboards, { is_default: true })
        cy.url().should('include', `dashboards/${dashboard.seq_id}`)
      })
    })
  })

  it('[/1/dashboards/1] 學年頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}`)
        cy.contains('班級')
      })
    })
  })

  it('[/1/dashboards/new] 新增學年頁面 ', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        cy.visit(`${school.seq_id}/dashboards/new`)
        cy.contains('新增')
      })
    })
  })

  it('[/1/dashboards/1/edit] 編輯頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        const dashboard = _.find(school.dashboards, { is_default: true })
        cy.visit(`${school.seq_id}/dashboards/${dashboard.seq_id}/edit`)
        cy.contains('編輯')
      })
    })
  })
})
