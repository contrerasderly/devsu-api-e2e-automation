class CheckoutPage {
  selectors = {
    pageTitle: '.title',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    errorMessage: '[data-test="error"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
    finishButton: '[data-test="finish"]',
    summaryItems: '.cart_item',
    subtotalLabel: '.summary_subtotal_label',
    taxLabel: '.summary_tax_label',
    totalLabel: '.summary_total_label',
    confirmationHeader: '.complete-header',
    confirmationText: '.complete-text',
    cartBadge: '.shopping_cart_badge',
  };

  assertIsOnCheckoutStep1() {
    cy.url().should('include', '/checkout-step-one');
  }

  fillShippingInfo(firstName, lastName, postalCode) {
    if (firstName) cy.get(this.selectors.firstNameInput).clear().type(firstName);
    if (lastName) cy.get(this.selectors.lastNameInput).clear().type(lastName);
    if (postalCode) cy.get(this.selectors.postalCodeInput).clear().type(postalCode);
  }

  clickContinue() {
    cy.get(this.selectors.continueButton).click();
  }

  assertIsOnCheckoutStep2() {
    cy.url().should('include', '/checkout-step-two');
    cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Overview');
  }

  assertSummaryItemCount(count) {
    cy.get(this.selectors.summaryItems).should('have.length', count);
  }

  assertFinancials() {
    cy.get(this.selectors.subtotalLabel).should('be.visible');
    cy.get(this.selectors.taxLabel).should('be.visible');
    cy.get(this.selectors.totalLabel).should('be.visible');
  }

  assertErrorMessage(message) {
    cy.get(this.selectors.errorMessage)
      .should('be.visible')
      .and('contain', message);
  }

  clickFinish() {
    cy.get(this.selectors.finishButton).click();
  }

  assertOrderConfirmation(message) {
    cy.url().should('include', '/checkout-complete');
    cy.get(this.selectors.confirmationHeader)
      .should('be.visible')
      .and('have.text', message);
  }

  assertSecondaryMessage(message) {
    cy.get(this.selectors.confirmationText)
      .should('be.visible')
      .and('contain', message);
  }

  assertCartIsEmpty() {
    cy.get(this.selectors.cartBadge).should('not.exist');
  }
}

module.exports = new CheckoutPage();
