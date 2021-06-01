// support

// commands 就是增加 cy.xxx 的指令用的
// 而入面可以 call cy.task 的指令
// 因為只有 cy.task 的東西才可以做後端的操作
import './commands'

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})
