describe('[確定頁面] portfolio模組', () => {
  beforeEach(() => {
    cy.db('getSchoolBySlug', 'school-region')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這間學校?')
        }
        return doc
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
  })

  it('[/1/portfolio] portfolio模組頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/portfolio`)
        cy.contains('貼文')
      })
    })
  })

  it('[/1/portfolio/photos] portfolio相簿頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/portfolio/photos`)
        cy.contains('相簿')
      })
    })
  })
})
