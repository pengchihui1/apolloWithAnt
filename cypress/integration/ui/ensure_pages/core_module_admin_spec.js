describe('[確定頁面] admin模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-cdsj1')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }
        return doc
      })
      .as('school_cdsj1')

    cy.db('getSchooluserBySchoolSlugAndEmail', 'school-cdsj1', 'comus.leong@gmail.com')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶?')
        }
        return doc
      })
      .as('schooluser_comus')
  })

  it('[/1/admin] 學校管理員頁面', () => {
    cy.get('@school_cdsj1').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/admin`)
        cy.contains('管理員')
      })
    })
  })
})
