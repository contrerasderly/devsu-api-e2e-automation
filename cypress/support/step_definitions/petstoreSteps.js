const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let petId;

const apiUrl = (path) => `${Cypress.env('apiBaseUrl')}${path}`;

const petBody = (name, status) => ({
  id: petId,
  category: { id: 1, name: 'Dogs' },
  name,
  photoUrls: ['https://example.com/firulais.jpg'],
  tags: [{ id: 1, name: 'friendly' }],
  status,
});

const invalidPayloads = {
  vacio: {},
  id_no_numerico: { id: 'not_a_number' },
};

// ──────────────── Background ────────────────

Given('the pet ID for testing is {int}', (id) => {
  petId = id;
});

// ──────────────── CREATE ────────────────

When('I create a pet with name {string} and status {string}', (name, status) => {
  cy.request({
    method: 'POST',
    url: apiUrl('/pet'),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: petBody(name, status),
    failOnStatusCode: false,
  }).as('response');
});

When('I send a POST to route {string} with invalid body {string}', (_route, payloadType) => {
  cy.request({
    method: 'POST',
    url: apiUrl('/pet'),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: invalidPayloads[payloadType],
    failOnStatusCode: false,
  }).as('response');
});

// ──────────────── READ ────────────────

When('I look up the pet by ID', () => {
  cy.request({
    method: 'GET',
    url: apiUrl(`/pet/${petId}`),
    headers: { Accept: 'application/json' },
    failOnStatusCode: false,
  }).as('response');
});

When('I look up the pet with ID {int}', (id) => {
  cy.request({
    method: 'GET',
    url: apiUrl(`/pet/${id}`),
    headers: { Accept: 'application/json' },
    failOnStatusCode: false,
  }).as('response');
});

// ──────────────── UPDATE ────────────────

When('I update the pet with name {string} and status {string}', (name, status) => {
  cy.request({
    method: 'PUT',
    url: apiUrl('/pet'),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: petBody(name, status),
    failOnStatusCode: false,
  }).as('response');
});

// ──────────────── SEARCH ────────────────

When('I search pets by status {string}', (status) => {
  cy.request({
    method: 'GET',
    url: apiUrl('/pet/findByStatus'),
    qs: { status },
    headers: { Accept: 'application/json' },
    failOnStatusCode: false,
  }).as('response');
});

// ──────────────── HTTP status assertions ────────────────

Then('the response status should be {int}', (statusCode) => {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(statusCode);
  });
});

// ──────────────── Single pet assertions ────────────────

Then('the response pet should have name {string} and status {string}', (name, status) => {
  cy.get('@response').then((res) => {
    expect(res.body.id).to.eq(petId);
    expect(res.body.name).to.eq(name);
    expect(res.body.status).to.eq(status);
  });
});

Then('the response pet should have category {string}', (categoryName) => {
  cy.get('@response').then((res) => {
    expect(res.body.category.name).to.eq(categoryName);
  });
});

Then('the response pet should have the correct ID', () => {
  cy.get('@response').then((res) => {
    expect(res.body.id).to.eq(petId);
  });
});

Then('the response pet should have a text name and text status', () => {
  cy.get('@response').then((res) => {
    expect(res.body.name).to.be.a('string');
    expect(res.body.status).to.be.a('string');
    expect(res.body.photoUrls).to.be.an('array');
  });
});

Then('the response pet should have status {string}', (status) => {
  cy.get('@response').then((res) => {
    expect(res.body.status).to.eq(status);
  });
});

Then('the response message should be {string}', (message) => {
  cy.get('@response').then((res) => {
    expect(res.body.message).to.eq(message);
  });
});

// ──────────────── List assertions ────────────────

Then('the response should be a non-empty array', () => {
  cy.get('@response').then((res) => {
    expect(res.body).to.be.an('array').and.have.length.greaterThan(0);
  });
});

Then('every item in the list should have status {string}', (status) => {
  cy.get('@response').then((res) => {
    res.body.forEach((pet) => {
      expect(pet.status).to.eq(status);
    });
  });
});

Then('my pet should be in the list with name {string}', (expectedName) => {
  cy.get('@response').then((res) => {
    expect(res.body).to.be.an('array').and.have.length.greaterThan(0);
    const found = res.body.find((pet) => pet.id === petId);
    expect(found, `Pet with ID ${petId} not found in the list`).to.exist;
    expect(found.name).to.eq(expectedName);
    expect(found.status).to.eq('sold');
  });
});
