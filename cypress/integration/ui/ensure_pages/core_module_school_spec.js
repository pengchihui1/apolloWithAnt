describe('[確定頁面] school模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-cdsj1')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }
        return doc
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

  it('[/1] 學校頁面 (轉址)', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@user_comus').then(user => {
        cy.auth(user.id)
        cy.visit(`${school.seq_id}`)
        // 轉址
        cy.url().should('include', 'portfolio')
      })
    })
  })
})
