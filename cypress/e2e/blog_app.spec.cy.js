describe('Blog app', function () {
  beforeEach(function () {
    // need to reset here
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'jason ari',
      username: 'jason_232',
      password: 'pasta_is_yummy'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Welcome to Blogs Application!')
    cy.contains('log in application')
  })

  it('Login form is shown', function () {
    cy.get('.input-username').parent().contains('username')
    cy.get('.input-password').parent().contains('password')
  })
})