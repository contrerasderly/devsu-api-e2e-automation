const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutPage = require('../pages/CheckoutPage');

// ──────────────── Background ────────────────

Given('que estoy en la página de inicio de sesión', () => {
  loginPage.visit();
});

// ──────────────── Login ────────────────

When('inicio sesión con el usuario {string} y contraseña {string}', (username, password) => {
  loginPage.login(username, password);
});

Then('debo estar en la página de inventario', () => {
  inventoryPage.assertIsOnInventoryPage();
});

// ──────────────── Carrito ────────────────

When('agrego el primer producto al carrito', () => {
  inventoryPage.addProductByIndex(0);
});

When('agrego el segundo producto al carrito', () => {
  inventoryPage.addProductByIndex(1);
});

Then('el ícono del carrito debe mostrar {string} productos', (count) => {
  inventoryPage.getCartBadge().should('have.text', count);
});

When('navego al carrito', () => {
  inventoryPage.goToCart();
});

Then('debo ver {int} productos en el carrito', (count) => {
  cartPage.assertIsOnCartPage();
  cartPage.assertItemCount(count);
});

// ──────────────── Checkout ────────────────

When('procedo al checkout', () => {
  cartPage.clickCheckout();
});

When('ingreso mis datos de envío {string} {string} y código postal {string}', (firstName, lastName, postalCode) => {
  checkoutPage.assertIsOnCheckoutStep1();
  checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
});

When('continúo al resumen del pedido', () => {
  checkoutPage.clickContinue();
});

Then('debo ver el resumen del pedido con los productos', () => {
  checkoutPage.assertIsOnCheckoutStep2();
  checkoutPage.assertSummaryHasItems();
});

When('finalizo la compra', () => {
  checkoutPage.clickFinish();
});

Then('debo ver el mensaje {string}', (expectedMessage) => {
  checkoutPage.assertOrderConfirmation(expectedMessage);
});
