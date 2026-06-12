class InventoryPage {
  selectors = {
    pageTitle: '.title',
    inventoryItems: '.inventory_item',
    addToCartButtons: '[data-test^="add-to-cart"]',
    removeButtons: '[data-test^="remove"]',
    cartBadge: '.shopping_cart_badge',
    cartLink: '.shopping_cart_link',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
  };

  assertIsOnInventoryPage() {
    cy.url().should('include', '/inventory');
    cy.get(this.selectors.pageTitle).should('have.text', 'Products');
  }

  addProductByIndex(index) {
    cy.get(this.selectors.addToCartButtons).eq(index).click();
  }

  getCartBadge() {
    return cy.get(this.selectors.cartBadge);
  }

  goToCart() {
    cy.get(this.selectors.cartLink).click();
  }
}

module.exports = new InventoryPage();
