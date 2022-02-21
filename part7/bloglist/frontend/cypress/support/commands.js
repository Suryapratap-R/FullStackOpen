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

// Add new blog post
Cypress.Commands.add("addBlog", function (title, author, url) {
  cy.get("button").contains("create new blog").click();
  cy.get("#inputTitle").type(title);
  cy.get("#inputAuthor").type(author);
  cy.get("#inputUrl").type(url);

  cy.get("#create-blog").click();
});

// Like blog post using title
Cypress.Commands.add("likePost", function (title) {
  cy.get(".blog").contains(title).contains("show").click();
  cy.get("button").contains("like").click();
  cy.get(".blog").contains(title).contains("hide").click();
});
