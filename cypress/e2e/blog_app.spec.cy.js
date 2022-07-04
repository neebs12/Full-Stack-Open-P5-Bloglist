describe('Blog app', function () {
  beforeEach(function () {
    // need to reset here, promise pattern included
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    .then(() => {
      // clears localStorage for reset
      localStorage.clear()

      const user = {
        name: 'jason ari',
        username: 'jason_232',
        password: 'pasta_is_yummy'
      }
      
      return cy.request('POST', 'http://localhost:3000/api/users', user)
    })
    .then(() => {
      cy.visit('http://localhost:3000')
    })
  })

  it('front page can be opened and login form shown', function() {
    cy.contains('Welcome to Blogs Application!')
    cy.contains('log in application')
    cy.get('.input-username').parent().contains('username')
    cy.get('.input-password').parent().contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // Isolate the sole username input
      cy.get('.input-username').type('jason_232')
      cy.get('.input-password').type('pasta_is_yummy')
      cy.get('#login-button').click()

      cy.contains('jason_232 is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('.input-username').type('jason_232')
      cy.get('.input-password').type('moms_spagetti')
      cy.get('#login-button').click()  
      
      cy.contains('Incorrect username or password')
    })
  })
})