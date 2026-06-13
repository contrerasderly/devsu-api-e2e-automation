// Custom Cypress commands

Cypress.Commands.add('loginSaucedemo', (username, password) => {
  cy.visit('/');
  cy.get('#user-name').clear().type(username);
  cy.get('#password').clear().type(password);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory');
});
