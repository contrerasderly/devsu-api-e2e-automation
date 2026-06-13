# Devsu QA Automation

Reto técnico para cargo Semi Senior / Senior QA Automation Engineer — Sector Bancario — Devsu

Framework de automatización de pruebas E2E y API usando **Cypress + Cucumber (Gherkin) + Allure** con un stack 100% JavaScript/Node.js

## Tecnologías

Node.js: >= 18 | Entorno de ejecución
Cypress: ^15.17.0 | Framework de automatización
@badeball/cypress-cucumber-preprocessor | ^24.0.1 | Soporte Gherkin/BDD
@shelex/cypress-allure-plugin | ^2.40.2 | Integración con Allure
Allure CLI | >= 2.24 | Reportes HTML interactivos

## Estructura del proyecto

devsu-api-e2e-automation/
├── .gitignore
├── README.md
├── conclusiones.txt
├── package.json                     # Configuración y scripts del proyecto
├── cypress.config.js                # Configuración global de Cypress
└── cypress/
    ├── e2e/
    │   ├── petstore/
    │   │   └── petstore.feature     # Escenarios Gherkin — API Petstore
    │   └── saucedemo/
    │       └── saucedemo.feature    # Escenarios Gherkin — E2E Saucedemo
    ├── fixtures/
    │   └── users.json               # Datos de prueba
    └── support/
        ├── e2e.js                   # Setup global (Allure + commands)
        ├── commands.js              # Comandos Cypress personalizados
        ├── step_definitions/
        │   ├── petstoreSteps.js     # Steps API con cy.request()
        │   └── saucedemoSteps.js    # Steps E2E con Page Objects
        └── pages/                   # Page Object Model
            ├── LoginPage.js
            ├── InventoryPage.js
            ├── CartPage.js
            └── CheckoutPage.js

## Requisitos previos
Antes de instalar, asegúrate de tener:

- **Node.js** >= 18 instalado → verificar con `node -v`
- **npm** >= 9 instalado → verificar con `npm -v`
- **Allure CLI** instalado globalmente → verificar con `allure --version`
  ```bash
  # Instalar Allure CLI
  brew install allure        # macOS
  scoop install allure       # Windows
  ```
- **Google Chrome** instalado (requerido para la ejecución headless)

## Instalación
Ejecutar **una sola vez** desde la raíz del proyecto:

```bash
npm install --legacy-peer-deps
```
## Ejecución de pruebas
Todos los comandos se ejecutan desde la **raíz del proyecto**

### Abrir la UI interactiva de Cypress
```bash
npm run open
```
Permite seleccionar y ver los tests corriendo visualmente, paso a paso
### Correr en modo headless
```bash
# Solo pruebas de API (Petstore)
npm run test:api

# Solo pruebas E2E (Saucedemo)
npm run test:e2e

# Todas las suites
npm test
```

## Reportes
Los resultados Allure se generan automáticamente en `cypress/allure-results/` tras cada ejecución
```bash
# Servidor en vivo
npm run report

# Generar reporte HTML estático
npm run report:generate

# Abrir reporte HTML estático
npm run report:open
```
## Aplicaciones bajo prueba
API = Petstore Swagger | https://petstore.swagger.io/v2 |
E2E = Saucedemo | https://www.saucedemo.com |