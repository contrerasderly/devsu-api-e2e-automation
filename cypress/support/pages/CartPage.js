class CartPage {
  selectors = {
    pageTitle: '.title',
    cartItems: '.cart_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    itemQuantity: '.cart_quantity',
    removeButtons: '[data-test^="remove"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    checkoutButton: '[data-test="checkout"]',
  };

  assertIsOnCartPage() {
    cy.url().should('include', '/cart');
    cy.get(this.selectors.pageTitle).should('have.text', 'Your Cart');
  }

  assertItemCount(count) {
    cy.get(this.selectors.cartItems).should('have.length', count);
  }

  assertItemsHaveDetails() {
    cy.get(this.selectors.cartItems).each(($item) => {
      cy.wrap($item).find(this.selectors.itemName).should('be.visible');
      cy.wrap($item).find(this.selectors.itemPrice).should('be.visible');
      cy.wrap($item).find(this.selectors.itemQuantity).should('be.visible');
    });
  }

  removeFirstItem() {
    cy.get(this.selectors.removeButtons).first().click();
  }

  clickCheckout() {
    cy.get(this.selectors.checkoutButton).click();
  }
}

module.exports = new CartPage();
