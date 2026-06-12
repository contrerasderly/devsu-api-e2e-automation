Feature: Saucedemo - Flujo Completo de Compra
  Como usuario registrado de Saucedemo
  Quiero realizar el proceso completo de compra
  Para confirmar que el flujo de e-commerce funciona correctamente

  Background:
    Given que estoy en la página de inicio de sesión

  Scenario: Compra exitosa con dos productos
    When inicio sesión con el usuario "standard_user" y contraseña "secret_sauce"
    Then debo estar en la página de inventario
    When agrego el primer producto al carrito
    And agrego el segundo producto al carrito
    Then el ícono del carrito debe mostrar "2" productos
    When navego al carrito
    Then debo ver 2 productos en el carrito
    When procedo al checkout
    And ingreso mis datos de envío "John" "Doe" y código postal "12345"
    And continúo al resumen del pedido
    Then debo ver el resumen del pedido con los productos
    When finalizo la compra
    Then debo ver el mensaje "Thank you for your order!"
