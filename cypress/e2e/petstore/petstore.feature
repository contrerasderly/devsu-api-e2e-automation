@api @petstore
Feature: Petstore API - Pet lifecycle management
  As a Petstore API consumer
  I want to manage the lifecycle of a pet
  So that I can verify CRUD operations work correctly

  Background:
    Given the pet ID for testing is 998877

  # CREATE
  @create @smoke
  Scenario: Successfully add a new pet to the store
    When I create a pet with name "Firulais" and status "available"
    Then the response status should be 200
    And the response pet should have name "Firulais" and status "available"
    And the response pet should have category "Dogs"

  @create @negative
  Scenario Outline: Creating a pet with an invalid payload reflects real API behavior
    When I send a POST to route "/pet" with invalid body "<payload_type>"
    Then the response status should be <expected_status>

    Examples:
      | payload_type   | expected_status |
      | vacio          | 200             |
      | id_no_numerico | 500             |

  # READ
  @read @smoke
  Scenario: Look up an existing pet by ID
    When I look up the pet by ID
    Then the response status should be 200
    And the response pet should have the correct ID
    And the response pet should have a text name and text status

  @read @negative
  Scenario: Looking up a non-existent pet ID returns 404
    When I look up the pet with ID 999999999
    Then the response status should be 404
    And the response message should be "Pet not found"

  # UPDATE
  @update @smoke
  Scenario: Update an existing pet's name and status
    When I update the pet with name "Firulais de Derly" and status "sold"
    Then the response status should be 200
    And the response pet should have name "Firulais de Derly" and status "sold"

  # SEARCH BY STATUS
  @search @smoke
  Scenario: Search pets by status "sold" and verify the pet exists in the list
    When I search pets by status "sold"
    Then the response status should be 200
    And the response should be a non-empty array
    And every item in the list should have status "sold"
    And my pet should be in the list with name "Firulais de Derly"

  # UPDATE — VALID STATUSES
  @update
  Scenario Outline: Update a pet with different valid statuses
    When I update the pet with name "Firulais" and status "<status>"
    Then the response status should be 200
    And the response pet should have status "<status>"

    Examples:
      | status    |
      | available |
      | pending   |
      | sold      |