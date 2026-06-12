======================================================
  DEVSU - QA AUTOMATION EXERCISE
  E2E: Cypress + Gherkin | API: Karate + Gherkin
  Reporting: Allure Report
======================================================

REQUISITOS PREVIOS
------------------
  Allure CLI (necesario para generar y visualizar reportes):
    - macOS: brew install allure
    - Verificar: allure --version  (debe ser >= 2.24)

  E2E (Cypress):
    - Node.js >= 18.x  (https://nodejs.org)
    - npm >= 9.x       (incluido con Node.js)
    - Google Chrome (recomendado para UI)

  API (Karate):
    - Java JDK >= 11   (https://adoptium.net)
    - Apache Maven >= 3.8  (https://maven.apache.org)


======================================================
  PARTE 1 — E2E CON CYPRESS + CUCUMBER
  Sitio: https://www.saucedemo.com
======================================================

ESTRUCTURA DEL PROYECTO E2E
-----------------------------
  e2e/
  ├── cypress/
  │   ├── e2e/features/
  │   │   └── saucedemo.feature          <- Escenario Gherkin
  │   ├── support/
  │   │   ├── pages/                     <- Page Object Model
  │   │   │   ├── LoginPage.js
  │   │   │   ├── InventoryPage.js
  │   │   │   ├── CartPage.js
  │   │   │   └── CheckoutPage.js
  │   │   ├── step_definitions/
  │   │   │   └── saucedemoSteps.js      <- Definición de pasos
  │   │   ├── commands.js
  │   │   └── e2e.js
  │   ├── fixtures/
  │   │   └── users.json
  │   ├── allure-results/               <- Generado al ejecutar (gitignored)
  │   └── allure-report/                <- Reporte HTML (gitignored)
  ├── cypress.config.js
  ├── package.json
  └── .npmrc

PASO A PASO — EJECUCIÓN E2E
-----------------------------

  1. Abrir terminal y navegar a la carpeta del proyecto E2E:

       cd e2e

  2. Instalar las dependencias de Node.js:

       npm install

  3a. OPCIÓN A — Ejecutar en modo headless (genera resultados Allure):

       npm run cy:run

  3b. OPCIÓN B — Abrir Cypress en modo interactivo:

       npm run cy:open

       En la ventana de Cypress:
         - Seleccionar "E2E Testing"
         - Elegir el navegador (Chrome recomendado)
         - Hacer clic en "saucedemo.feature"

  4. Generar el reporte HTML de Allure:

       npm run allure:generate

  5a. Abrir el reporte estático (requiere haber ejecutado paso 4):

       npm run allure:open

  5b. Levantar servidor Allure en vivo (recomendado):

       npm run allure:serve

NOTAS ALLURE E2E:
  - Los resultados JSON se guardan en: cypress/allure-results/
  - El reporte HTML se genera en:    cypress/allure-report/
  - Videos de ejecución en:          cypress/reports/videos/


======================================================
  PARTE 2 — API CON KARATE + GHERKIN
  Sitio: https://petstore.swagger.io
======================================================

ESTRUCTURA DEL PROYECTO API
-----------------------------
  api/
  ├── src/test/
  │   ├── java/runner/
  │   │   └── PetStoreRunner.java        <- Runner JUnit5 con AllureKarate
  │   └── resources/
  │       ├── karate-config.js           <- Configuración global (baseUrl)
  │       └── petstore/
  │           └── petstore.feature       <- Escenarios Gherkin
  └── pom.xml

PASO A PASO — EJECUCIÓN API
-----------------------------

  1. Abrir terminal y navegar a la carpeta del proyecto API:

       cd api

  2. Ejecutar los tests con Maven:

       mvn clean test

     (La primera ejecución descarga dependencias automáticamente)

  3. Generar el reporte HTML de Allure:

       mvn allure:report

     El reporte se genera en: api/target/allure-report/

  4. Abrir el reporte:

       mvn allure:serve

     Esto levanta un servidor local y abre el reporte en el navegador.

  5. ALTERNATIVA — Usar Allure CLI directamente:

       allure generate target/allure-results --clean -o target/allure-report
       allure open target/allure-report

NOTAS ALLURE API:
  - Los resultados JSON se guardan en: target/allure-results/
  - El reporte HTML se genera en:      target/allure-report/
  - El reporte Karate nativo en:       target/karate-reports/karate-summary.html


======================================================
  EJECUCIÓN COMPLETA (ambos proyectos desde la raíz)
======================================================

  # E2E
  cd e2e && npm install && npm run cy:run && npm run allure:serve

  # API (en otra terminal)
  cd api && mvn clean test && mvn allure:serve


======================================================
  REPORTES GENERADOS (Allure)
======================================================

  E2E (Cypress):
    - Resultados:  e2e/cypress/allure-results/    <- JSON + attachments
    - Reporte:     e2e/cypress/allure-report/     <- HTML interactivo
    - Comando:     npm run allure:serve

  API (Karate):
    - Resultados:  api/target/allure-results/     <- JSON + attachments
    - Reporte:     api/target/allure-report/      <- HTML interactivo
    - Comando:     mvn allure:serve

  Ambos reportes incluyen:
    ✔ Resultados por escenario (passed / failed / skipped)
    ✔ Timeline de ejecución
    ✔ Request/Response bodies (API)
    ✔ Screenshots en fallos (E2E)
    ✔ Historial de ejecuciones (si se acumula allure-results)


======================================================
  CREDENCIALES Y DATOS DE PRUEBA
======================================================

  Saucedemo:
    Usuario:    standard_user
    Contraseña: secret_sauce

  Petstore API:
    Base URL: https://petstore.swagger.io/v2
    Pet ID:   generado aleatoriamente en cada ejecución


======================================================
  TROUBLESHOOTING
======================================================

  Error: "allure: command not found"
    -> Instalar Allure CLI: brew install allure

  Error: "cypress: command not found"
    -> Ejecutar directamente: npx cypress run --env allure=true

  Error: "Cannot find module '@shelex/cypress-allure-plugin'"
    -> Ejecutar: npm install  (dentro de la carpeta e2e/)

  Error Maven: "Could not find artifact"
    -> Verificar conexión a internet: mvn dependency:resolve

  Error Java: "UnsupportedClassVersionError"
    -> Verificar versión Java: java -version  (debe ser >= 11)

  Cypress no abre en macOS 15 (modo headless):
    -> Ejecutar en modo interactivo: npm run cy:open
    -> O abre manualmente: open -a Cypress  y navega al proyecto
