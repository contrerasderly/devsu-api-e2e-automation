@e2e @saucedemo
Feature: Saucedemo - Full purchase flow
  As a registered Saucedemo user
  I want to complete the full purchase process
  So that I can confirm the e-commerce flow works correctly

  Background:
    Given I am on the Saucedemo login page

  # LOGIN
  @login @smoke
  Scenario: Successful login with valid credentials
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should be on the inventory page
    And the page title should be "Products"

  @login @negative
  Scenario Outline: Failed login with invalid credentials
    When I log in with username "<username>" and password "<password>"
    Then I should see the error message "<message>"

    Examples:
      | username        | password     | message                                                         |
      | locked_out_user | secret_sauce | Sorry, this user has been locked out.                           |
      | standard_user   | wrong_pass   | Username and password do not match any user in this service     |
      | invalid_user    | secret_sauce | Username and password do not match any user in this service     |

  # SHOPPING CART
  @cart @smoke
  Scenario: Add two products to the cart from the inventory
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add the product at position 1 to the cart
    And I add the product at position 2 to the cart
    Then the cart icon should show "2" items

  @cart
  Scenario: View the products added to the cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added 2 products to the cart
    When I navigate to the cart
    Then I should see 2 products listed in the cart
    And each product should show name, price and quantity

  @cart
  Scenario: Remove a product from the cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added 2 products to the cart
    When I navigate to the cart
    And I remove the first product from the cart
    Then the cart icon should show "1" items
    And I should see 1 products listed in the cart

  # CHECKOUT
  @checkout @smoke
  Scenario: Complete the checkout form with valid data
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added 2 products to the cart
    And I have navigated to the cart
    When I proceed to checkout
    And I enter my shipping info "Derly" "Contreras" and postal code "540005"
    And I continue to the order summary
    Then I should see the order summary with 2 products
    And I should see the order subtotal, taxes and total

  @checkout @negative
  Scenario Outline: Checkout form with empty required fields
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added 2 products to the cart
    And I have navigated to the cart
    When I proceed to checkout
    And I enter my shipping info "<first_name>" "<last_name>" and postal code "<postal>"
    And I continue to the order summary
    Then I should see the checkout error message "<error_message>"

    Examples:
      | first_name | last_name | postal | error_message                   |
      |            | Contreras | 540005 | First Name is required          |
      | Derly      |           | 540005 | Last Name is required           |
      | Derly      | Contreras |        | Postal Code is required         |

  # PURCHASE CONFIRMATION
  @purchase @smoke @regression
  Scenario: Successfully complete a purchase and see confirmation
    Given I am logged in as "standard_user" with password "secret_sauce"
    And I have added 2 products to the cart
    And I have navigated to the cart
    And I have completed the checkout form with "Derly" "Contreras" and postal code "111000"
    When I complete the purchase
    Then I should see the confirmation message "Thank you for your order!"
    And I should see the secondary message "Your order has been dispatched"
    And the cart should be empty