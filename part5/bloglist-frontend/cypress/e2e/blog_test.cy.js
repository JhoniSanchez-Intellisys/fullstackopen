describe("BlogList app", function () {
  beforeEach(function () {

    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'jhoni',
      username: 'Jhoni-test',
      password: '123456'
    }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)//Usando variables de entorno en Cypres
    cy.login({ username: 'Jhoni-test', password: '123456' })//login automatico
    //   .then(response => {
    //     localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    //     cy.visit('http://localhost:5173')
    //   })
    // cy.visit("http://localhost:5173")

  })


  // it("front page can be opened-login normal", function () {
  //   cy.visit("http://localhost:5173")
  //   cy.contains("Blogs")
  //   cy.contains("username")
  //   cy.contains("Loging")
  // })
  // it("login form can be opened", function () {
  //   cy.visit("http://localhost:5173")
  //   cy.contains("login").click()
  // })
  // it("user can login-login normal", function () {

  //   // cy.get("input:first").type("Jhoni-Users")
  //   // cy.get("input:last").type("123456")
  //   // cy.contains("login").click()

  //   cy.get("#username").type("Jhoni-test")
  //   cy.get("#password").type("123456")
  //   cy.get("#login-button").click()
  //   cy.contains("User: Jhoni-test")



  // })

  // it("a new blog can be created-login normal", function () {

  //   cy.get("#username").type("Jhoni-test")
  //   cy.get("#password").type("123456")
  //   cy.get("#login-button").click()
  //   cy.contains("User: Jhoni-test")

  //   cy.get("#blog-input").type("a note created by cypress")
  //   cy.get("#author").type("a note created by cypress")
  //   cy.get("#url").type("a note created by cypress")
  //   cy.contains("save").click()
  // })

  // it("a new blog can be liked- con loging normal", function () {

  //   cy.get("#username").type("Jhoni-test")
  //   cy.get("#password").type("123456")
  //   cy.get("#login-button").click()
  //   cy.contains("User: Jhoni-test")

  //   cy.get("#blog-input").type("a note created by cypress")
  //   cy.get("#author").type("a note created by cypress")
  //   cy.get("#url").type("a note created by cypress")
  //   cy.contains("save").click()
  //   cy.contains("Mostrar").click()
  //   cy.contains("Likes: 0").click()
  //   cy.contains("Likes: 1")


  // })


  // it("a new blog can be liked-con login automatico", function () {
  //   cy.contains("User: Jhoni-test")
  //   cy.get("#blog-input").type("a note created by cypress")
  //   cy.get("#author").type("a note created by cypress")
  //   cy.get("#url").type("a note created by cypress")
  //   cy.contains("save").click()
  //   cy.contains("Mostrar").click()
  //   cy.contains("Likes: 0").click()
  //   cy.contains("Likes: 1")
  // })

  // it("a new blog with interface -login automatico", function () {
  //   cy.contains("User: Jhoni-test")
  //   cy.get("#blog-input").type("a note created by cypress")
  //   cy.get("#author").type("a note created by cypress")
  //   cy.get("#url").type("a note created by cypress")
  //   cy.contains("save").click()
  //   cy.contains("Mostrar").click()
  //   cy.contains("Likes: 0").click()
  //   cy.contains("Likes: 1")
  // })


  it("a new blog without interface", function () {
    cy.createNote({
      title: 'Sin Interface',
      author: 'nueblo Block, creado',
      likes: 0,
      url: 'http//wwwwwwwwww'
    })
    cy.createNote({
      title: 'Sin Interface',
      author: 'nueblo Block, creado',
      likes: 0,
      url: 'http//wwwwwwwwww'
    })
    cy.createNote({
      title: 'Sin Interface',
      author: 'nueblo Block, creado',
      likes: 0,
      url: 'http//wwwwwwwwww'
    })
    cy.contains("Mostrar").click()
    cy.contains("Likes: 0").click()
    cy.contains("Likes: 1")

  })

  // describe('and a note exists', function () {
  //   beforeEach(function () {
  //     cy.createNote({
  //       title: 'anothernotecypress',
  //       author: 'dscefcfe',
  //       url: 'trutrbbe'
  //     })}
  //   )})


  // it("Error Passwor or User", function () {

  //   cy.get("#username").type("Jhoni-test")
  //   cy.get("#password").type("1234567")
  //   cy.get("#login-button").click()
  //   cy.contains("invalid username or password")
  //   cy.get('.notification').contains('invalid username or password')

  // })


})