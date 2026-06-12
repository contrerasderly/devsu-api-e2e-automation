class LoginPage {
  selectors = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]',
  };

  visit() {
    cy.visit('/');
  }

  typeUsername(username) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  typePassword(password) {
    cy.get(this.selectors.passwordInput).clear().type(password);
  }

  clickLogin() {
    cy.get(this.selectors.loginButton).click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }
}

module.exports = new LoginPage();
