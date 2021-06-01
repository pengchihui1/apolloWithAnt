describe('[確定頁面] home模組', () => {
  beforeEach(() => {
    cy.db('getUserByEmail', 'comus.leong@gmail.com')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶')
        }
        return doc
      })
      .as('user_comus')
  })

  it('[/] 首頁', () => {
    cy.visit('/')
    cy.contains('進入')
  })

  it('[/login] 登入頁面', () => {
    cy.visit('/login')
    cy.contains('登入')
  })

  it('[/launch] launch頁面', () => {
    // 登入了看到學校列表
    cy.get('@user_comus').then(user => {
      cy.auth(user.id)
      cy.visit('/launch')
      cy.contains('中學')
    })
  })
})
