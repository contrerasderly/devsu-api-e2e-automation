class CartPage {
  selectors = {
    pageTitle: '.title',
    cartItems: '.cart_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    continueShoppingButton: '[data-test="continue-shopping"]',
    checkoutButton: '[data-test="checkout"]',
  };

  assertIsOnCartPage() {
    cy.url().should('include', '/cart');
    cy.get(this.selectors.pageTitle).should('have.text', 'Your Cart');
  }

  getCartItems() {
    return cy.get(this.selectors.cartItems);
  }

  assertItemCount(count) {
    cy.get(this.selectors.cartItems).should('have.length', count);
  }

  clickCheckout() {
    cy.get(this.selectors.checkoutButton).click();
  }
}

module.exports = new CartPage();
