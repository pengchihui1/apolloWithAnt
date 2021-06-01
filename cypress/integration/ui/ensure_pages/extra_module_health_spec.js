describe('[確定頁面] health模組', () => {
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

    cy.db('getSchooluserBySchoolSlugAndEmail', 'school-region', 'student236@student.region.edu.mo')
      .then(doc => {
        if (!doc) {
          throw new Error('為什麼會沒有這用戶?')
        }
        cy.db('getMedicalRecordsBySchooluserId', doc.id)
          .then(visits => {
            doc.visits = visits
            return doc
          })
          .as('schooluser_student236')
      })
      .as('schooluser_student236')
  })

  it('[/1/health] 健康模組頁面 (轉址)', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/health`)
        cy.url().should('include', 'health/visits')
      })
    })
  })

  it('[/1/health/visits] 來診記錄頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/health/visits`)
        cy.contains('來診記錄')
      })
    })
  })

  it('[/1/health/visits/new] 新增來診記錄頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/health/visits/new`)
        cy.contains('登記')
      })
    })
  })

  it('[/1/health/visits/1] 查看/修改單項來診記錄頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_student236').then(schooluser => {
        cy.auth(schooluser.user_id)
        const visit = schooluser.visits[0]
        cy.visit(`${school.seq_id}/health/visits/${visit.seq_id}`)
        cy.contains('來診記錄')
        cy.contains('學生資料')
        cy.contains('學生病歷表')
      })
    })
  })

  it('[/1/health/users] 新增/查看/編輯所有學生的病歷', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.auth(schooluser.user_id)
        cy.visit(`${school.seq_id}/health/users`)
        cy.contains('學生病歷表')
      })
    })
  })

  it('[/1/health/users/1] 查看一個學生病歷的頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/users/${student.seq_id}`)
          cy.contains('學生病歷表')
          cy.contains('來診記錄')
          cy.contains('預防性隔離名單')
        })
      })
    })
  })

  it('[/1/health/users/1/print] 列印一個學生的病歷頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/users/${student.seq_id}/print`)
          cy.contains('個人健康檔案卡')
        })
      })
    })
  })

  it('[/1/health/import] 批量匯入資料病歷', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/import`)
          cy.contains('批量匯入')
        })
      })
    })
  })

  it('[/1/health/quarantines] 預防性隔離名單頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/quarantines`)
          cy.contains('預防性隔離')
        })
      })
    })
  })

  it('[/1/health/quarantines/new] 新增隔離用戶頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/quarantines/new`)
          cy.contains('新增預防性隔離')
        })
      })
    })
  })

  it('[/1/health/statistics] 統計資料頁面', () => {
    cy.get('@school-region').then(school => {
      cy.get('@schooluser_comus').then(schooluser => {
        cy.get('@schooluser_student236').then(student => {
          cy.auth(schooluser.user_id)
          cy.visit(`${school.seq_id}/health/statistics`)
          cy.contains('統計')
        })
      })
    })
  })
})
