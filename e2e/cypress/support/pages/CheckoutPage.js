class CheckoutPage {
  selectors = {
    pageTitle: '.title',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
    finishButton: '[data-test="finish"]',
    summaryItems: '.cart_item',
    subtotalLabel: '.summary_subtotal_label',
    totalLabel: '.summary_total_label',
    confirmationHeader: '.complete-header',
    confirmationText: '.complete-text',
    confirmationImage: '.pony_express',
  };

  assertIsOnCheckoutStep1() {
    cy.url().should('include', '/checkout-step-one');
  }

  fillShippingInfo(firstName, lastName, postalCode) {
    cy.get(this.selectors.firstNameInput).clear().type(firstName);
    cy.get(this.selectors.lastNameInput).clear().type(lastName);
    cy.get(this.selectors.postalCodeInput).clear().type(postalCode);
  }

  clickContinue() {
    cy.get(this.selectors.continueButton).click();
  }

  assertIsOnCheckoutStep2() {
    cy.url().should('include', '/checkout-step-two');
    cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Overview');
  }

  assertSummaryHasItems() {
    cy.get(this.selectors.summaryItems).should('have.length.at.least', 1);
    cy.get(this.selectors.subtotalLabel).should('be.visible');
    cy.get(this.selectors.totalLabel).should('be.visible');
  }

  clickFinish() {
    cy.get(this.selectors.finishButton).click();
  }

  assertOrderConfirmation(expectedMessage) {
    cy.url().should('include', '/checkout-complete');
    cy.get(this.selectors.confirmationHeader)
      .should('be.visible')
      .and('have.text', expectedMessage);
  }
}

module.exports = new CheckoutPage();
