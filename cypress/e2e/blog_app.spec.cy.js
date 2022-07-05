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
      
      // ---> user creation
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

  describe('When logged in', function () {
    beforeEach(function () {
      // login the user here -- use custom commands
      cy.login({
        username: 'jason_232',
        password: 'pasta_is_yummy',
      })
    })

    it('a blog can be created', function () {
      // create a new blog here
  
      // ACT
      cy.contains('new note').click() // has to be clicked
      cy.addBlog({
        title: 'cypress blog!',
        author: 'isaac sotelo',
        url: 'https://www.sotelo.com',
      })
      cy.wait(1000) 
      // <--- wait for 1 sec to wait for network
      cy.addBlog({
        title: 'another cypress blog!',
        author: 'jemimah ari',
        url: 'https://www.ari.io'
      })
      // ASSERT
      // <--- test on the notification
      cy.contains('Successfully created blog: cypress blog! by: isaac sotelo')
      // found one blog
      cy.get('.blog').should('have.length', 2)
    })

    it('a user can like a blog', function() {
      // ARRANGE (a blog)
      cy.contains('new note').click() // has to be clicked
      cy.addBlog({
        title: 'cypress blog!',
        author: 'isaac sotelo',
        url: 'https://www.sotelo.com',
      })
      cy.wait(1000) // <--- wait for 1 sec to wait for network

      // ACT
      cy.contains('button', 'view').click()

      // ASSERT, there are zero likes intially
      cy.contains('.blog', 'likes 0')

      // get the like button
      cy.contains('button', 'like').click()
      cy.wait(1000) // <--- 1 sec wait for network update
      cy.contains('.blog', 'likes 1')

      // second press
      cy.contains('button', 'like').click()
      cy.wait(1000) // <--- 1 sec wait for network update
      cy.contains('.blog', 'likes 2')
    })
  })
})