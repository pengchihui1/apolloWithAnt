import 'cypress-file-upload'

const Keygrip = require('keygrip')
const cookieKeygrip = new Keygrip(['school-session-cookie-secret'])

Cypress.Commands.add('auth', userId => {
  return cy.task('db:getUserById', [userId]).then(dbUser => {
    // passport格式
    const sessionObj = {
      passport: {
        user: JSON.stringify(dbUser)
      }
    }

    // 拿出user數據，轉碼成 session 格式。
    const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64')

    // 把session加密
    const sessionSig = cookieKeygrip.sign('session' + '=' + session)

    cy.setCookie(
      'session',
      session,
      {
        httpOnly: true,
        secure: false
      }
    )

    cy.setCookie(
      'session.sig',
      sessionSig,
      {
        httpOnly: true,
        secure: false
      }
    )
  })
})

Cypress.Commands.add('authUser', dbUser => {
  // passport格式
  const sessionObj = {
    passport: {
      user: JSON.stringify(dbUser)
    }
  }

  // 拿出user數據，轉碼成 session 格式。
  const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64')

  // 把session加密
  const sessionSig = cookieKeygrip.sign('session' + '=' + session)

  cy.setCookie(
    'session',
    session,
    {
      httpOnly: true,
      secure: false
    }
  )

  cy.setCookie(
    'session.sig',
    sessionSig,
    {
      httpOnly: true,
      secure: false
    }
  )
})

Cypress.Commands.add('db', (operation, ...rest) => {
  const params = [
    ...rest
  ]

  const log = Cypress.log({
    name: 'db',
    displayName: 'DB',
    message: [`🔎 ${operation}`],
    autoEnd: false,
    consoleProps () {
      return params
    }
  })

  return cy.task(`db:${operation}`, params)
    .then((data) => {
      log.snapshot()
      log.end()
      return data
    })
})

Cypress.Commands.add('resetdb', () => {
  cy.exec('yarn db:dev:seed', {
    failOnNonZeroExit: true,
    timeout: 20000
  })
})
