const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutPage = require('../pages/CheckoutPage');

// ──────────────── Background ────────────────

Given('I am on the Saucedemo login page', () => {
  loginPage.visit();
});

// ──────────────── Authentication ────────────────

When('I log in with username {string} and password {string}', (username, password) => {
  loginPage.login(username, password);
});

Then('I should be on the inventory page', () => {
  inventoryPage.assertIsOnInventoryPage();
});

Then('the page title should be {string}', (title) => {
  inventoryPage.assertPageTitle(title);
});

Then('I should see the error message {string}', (message) => {
  loginPage.assertErrorMessage(message);
});

// ──────────────── Session preconditions (compound Givens) ────────────────

// cy.session() caches the browser session between scenarios — UI login only
// happens once per username/password combination across the entire suite.
Given('I am logged in as {string} with password {string}', (username, password) => {
  cy.session([username, password], () => {
    loginPage.visit();
    loginPage.login(username, password);
    inventoryPage.assertIsOnInventoryPage();
  });
  cy.visit('/inventory.html', { failOnStatusCode: false });
});

Given('I have added {int} products to the cart', (count) => {
  for (let i = 0; i < count; i++) {
    inventoryPage.addProductByIndex(i);
  }
});

Given('I have navigated to the cart', () => {
  inventoryPage.goToCart();
  cartPage.assertIsOnCartPage();
});

Given('I have completed the checkout form with {string} {string} and postal code {string}', (firstName, lastName, postalCode) => {
  cartPage.clickCheckout();
  checkoutPage.assertIsOnCheckoutStep1();
  checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
  checkoutPage.clickContinue();
  checkoutPage.assertIsOnCheckoutStep2();
});

// ──────────────── Cart ────────────────

When('I add the product at position {int} to the cart', (position) => {
  inventoryPage.addProductByIndex(position - 1);
});

Then('the cart icon should show {string} items', (count) => {
  inventoryPage.getCartBadge().should('have.text', count);
});

When('I navigate to the cart', () => {
  inventoryPage.goToCart();
});

Then('I should see {int} products listed in the cart', (count) => {
  cartPage.assertIsOnCartPage();
  cartPage.assertItemCount(count);
});

Then('each product should show name, price and quantity', () => {
  cartPage.assertItemsHaveDetails();
});

When('I remove the first product from the cart', () => {
  cartPage.removeFirstItem();
});

// ──────────────── Checkout ────────────────

When('I proceed to checkout', () => {
  cartPage.clickCheckout();
});

When('I enter my shipping info {string} {string} and postal code {string}', (firstName, lastName, postalCode) => {
  checkoutPage.assertIsOnCheckoutStep1();
  checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
});

When('I continue to the order summary', () => {
  checkoutPage.clickContinue();
});

Then('I should see the order summary with {int} products', (count) => {
  checkoutPage.assertIsOnCheckoutStep2();
  checkoutPage.assertSummaryItemCount(count);
});

Then('I should see the order subtotal, taxes and total', () => {
  checkoutPage.assertFinancials();
});

Then('I should see the checkout error message {string}', (message) => {
  checkoutPage.assertErrorMessage(message);
});

// ──────────────── Purchase confirmation ────────────────

When('I complete the purchase', () => {
  checkoutPage.clickFinish();
});

Then('I should see the confirmation message {string}', (message) => {
  checkoutPage.assertOrderConfirmation(message);
});

Then('I should see the secondary message {string}', (message) => {
  checkoutPage.assertSecondaryMessage(message);
});

Then('the cart should be empty', () => {
  checkoutPage.assertCartIsEmpty();
});
