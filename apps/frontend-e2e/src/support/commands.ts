// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    createOffer(): string;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('createOffer',  () => {

  cy.intercept('POST','api/offers').as('Submit')

  cy.fixture('offer.json').then( (offer) => {

    // -- Address Block --
    cy.get('#city').type(offer.address.city)
    cy.get('#street').type(offer.address.street)
    cy.get('#house').type(offer.address.house)
    cy.get('#flat').type(offer.address.flat)

    // -- Payment Block --
    cy.get('#paymentStart').select(offer.payment.paymentStart)
    cy.get('#paymentType').select(offer.payment.type)
    cy.get('#penaltyType').select(offer.payment.penalty.type)
    cy.get('#penaltyStart').type(offer.payment.penalty.start)
    cy.get('#penaltyValue').type(offer.payment.penalty.value)
    cy.get('#penaltyCurrency').select(offer.payment.penalty.currency)

    // -- Property type --
    cy.get('#propertyType').select(offer.propertyType)

    // -- Options Block --
    offer.options.forEach( o => {
      cy.get('#add-option-btn').click()
      cy.get('.option').last().type(o.title)

    })

    // -- Term Block --
    offer.terms.forEach( t => {
      cy.get('#add-term-btn').click()
      cy.get('.term-price').last().type(t.price)
      cy.get('.term-currency').last().select(t.priceUnit)
      cy.get('.term-period-from').last().type(t.periodFrom)
      cy.get('.term-period-to').last().type(t.periodTo)
      cy.get('.term-period-unit').last().select(t.periodUnit)

      // -- Deposit Block --
      cy.get('.term-deposit-value').last().type(t.deposit.value)
      cy.get('.term-deposit-return-period').last().type(t.deposit.returnPeriod)
      cy.get('.term-deposit-return-period-unit').last().select(t.deposit.returnPeriodUnit)
      cy.get('.term-deposit-collect-type').last().select(t.deposit.collectType)

      // -- Termination rules Block --
      t.terminationRules.forEach( r => {

        cy.get('.add-termination-rule-btn').last().click()
        cy.get('.term-termination-rule-period').last().type(r.period)
        cy.get('.term-termination-rule-period-unit').last().select(r.periodUnit)
        cy.get('.term-termination-rule-value').last().type(r.value)
        cy.get('.term-termination-rule-currency').last().select(r.currency)
      })

    })

    // -- Submit --
    cy.get('form').submit()
    cy.wait('@Submit').then(i => {
      cy.wrap(i.response.body.resourceId).as('OfferID');
    })


  })

});
