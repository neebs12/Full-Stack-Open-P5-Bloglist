// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// For logging in --> by passing the UI
Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3000/api/login', {username, password})
  .then(({ body }) => {
    // <--- remember that we are no longer going through client api
    // <--- hence shape of expected obj is different!
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({title, author, url}) => {
  cy.get('.title-input input').type(title)
  cy.get('.author-input input').type(author)
  cy.get('.url-input input').type(url)  
  cy.contains('form button', 'create').click()
})