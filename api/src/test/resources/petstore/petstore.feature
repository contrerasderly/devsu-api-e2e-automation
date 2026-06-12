Feature: Petstore API - Gestión del Ciclo de Vida de una Mascota
  Como consumidor de la API Petstore
  Quiero gestionar el ciclo de vida de una mascota
  Para verificar que las operaciones CRUD funcionan correctamente

  Background:
    * url baseUrl

  Scenario: Ciclo completo - Agregar, Consultar por ID, Actualizar y Consultar por Estado

    # ─────────────────────────────────────────────────────
    # PASO 1: Agregar una nueva mascota a la tienda
    # ─────────────────────────────────────────────────────
    * def petId = Math.floor(Math.random() * 9000000) + 1000000
    * print 'Pet ID generado:', petId

    Given path 'pet'
    And header Content-Type = 'application/json'
    And header Accept = 'application/json'
    And request
      """
      {
        "id": #(petId),
        "category": {
          "id": 1,
          "name": "Dogs"
        },
        "name": "Firulais",
        "photoUrls": [
          "https://example.com/firulais.jpg"
        ],
        "tags": [
          {
            "id": 1,
            "name": "friendly"
          }
        ],
        "status": "available"
      }
      """
    When method POST
    Then status 200
    And match response.id == petId
    And match response.name == 'Firulais'
    And match response.status == 'available'
    And match response.category.name == 'Dogs'
    * print 'PASO 1 OK - Mascota creada con ID:', response.id

    # ─────────────────────────────────────────────────────
    # PASO 2: Consultar la mascota creada por ID
    # ─────────────────────────────────────────────────────
    Given path 'pet', petId
    And header Accept = 'application/json'
    When method GET
    Then status 200
    And match response.id == petId
    And match response.name == 'Firulais'
    And match response.status == 'available'
    And match response.photoUrls contains 'https://example.com/firulais.jpg'
    * print 'PASO 2 OK - Mascota consultada por ID:', response.id, '- Nombre:', response.name

    # ─────────────────────────────────────────────────────
    # PASO 3: Actualizar el nombre y estado a "sold"
    # ─────────────────────────────────────────────────────
    Given path 'pet'
    And header Content-Type = 'application/json'
    And header Accept = 'application/json'
    And request
      """
      {
        "id": #(petId),
        "category": {
          "id": 1,
          "name": "Dogs"
        },
        "name": "Firulais Updated",
        "photoUrls": [
          "https://example.com/firulais.jpg"
        ],
        "tags": [
          {
            "id": 1,
            "name": "friendly"
          }
        ],
        "status": "sold"
      }
      """
    When method PUT
    Then status 200
    And match response.id == petId
    And match response.name == 'Firulais Updated'
    And match response.status == 'sold'
    * print 'PASO 3 OK - Mascota actualizada. Nuevo nombre:', response.name, '- Estado:', response.status

    # ─────────────────────────────────────────────────────
    # PASO 4: Consultar mascota modificada por estado "sold"
    # ─────────────────────────────────────────────────────
    Given path 'pet', 'findByStatus'
    And header Accept = 'application/json'
    And param status = 'sold'
    When method GET
    Then status 200
    And match response == '#[] #object'
    And assert response.length > 0
    * def foundPets = karate.filter(response, function(pet){ return pet.id == petId })
    * print 'Mascotas con estado sold encontradas:', response.length
    * print 'Nuestra mascota en la lista:', foundPets.length > 0
    And assert foundPets.length > 0
    And match foundPets[0].name == 'Firulais Updated'
    And match foundPets[0].status == 'sold'
    * print 'PASO 4 OK - Mascota encontrada por estado sold. Nombre:', foundPets[0].name
