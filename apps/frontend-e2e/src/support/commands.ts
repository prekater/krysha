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

    insertOffer(): string;

    createContract(): string;

    exportContract(id: string): void;

    fillOfferTerms(terms: any): void;

    fillOfferOptions(options: any): void

    fillOfferPayment(payment: any): void

    fillOfferAddress(address: any): void;

    fillOfferMeta(meta: any): void;
  }
}

const periodUnitMap = {
  days: 0,
  months: 1,
  years: 2
}
const currencyMap = {
  RUB: 0,
  EUR: 1,
  USD: 2
}
Cypress.Commands.add('fillOfferTerms', (terms: any) => {

  cy.scrollTo(0, 1500) // Scroll the window 500px down


  terms.forEach((t, i) => {
    const periodUnitOption = periodUnitMap[t.periodUnit]

    // cy.get('.term-currency').last().select(t.priceUnit)
    cy.get('input[name="periodFrom"]').last().type(t.periodFrom)
    cy.get('input[name="periodTo"]').last().type(t.periodTo)
    cy.get('.period-unit').last().click()
    cy.get('.period-unit [role="option"]').eq(periodUnitOption).click()
    cy.get('input[name="price"]').last().type(t.price)
    cy.get('.price-currency').last().click()
    cy.get('.price-currency [role="option"]').eq(periodUnitOption).click()


    //
    // // -- Deposit Block --
    // if (t.deposit.isEnabled) {
    //   cy.get('.with-deposit').last().click({force: true})
    //   cy.get('.term-deposit-value').last().type(t.deposit.value)
    //   if (t.deposit.collectOptions[0].isEnabled) {
    //     cy.get('.remove-deposit-price-affect-checkbox input').last().click({force: true})
    //     cy.get('.term-deposit-remove-deposit-price-affect').last().clear().type(String(t.deposit.collectOptions[0].priceAffect))
    //   }
    //   if (t.deposit.collectOptions[1].isEnabled) {
    //     cy.get('.partial-deposit-price-affect-checkbox input').last().click({force: true})
    //     cy.get('.term-deposit-partial-deposit-price-affect').last().clear().type(String(t.deposit.collectOptions[1].priceAffect))
    //   }
    // }
    //
    // // cy.get('.term-deposit-return-period').last().type(t.deposit.returnPeriod)
    // // cy.get('.term-deposit-return-period-unit').last().select(t.deposit.returnPeriodUnit)
    // // cy.get('.term-deposit-collect-type').last().select(t.deposit.collectType)
    //
    // // -- Termination rules Block --
    // t.terminationRules.forEach((r, i) => {
    //
    //   cy.get('.term-termination-rule-period').last().type(r.period)
    //   cy.get('.term-termination-rule-period-unit').last().select(r.periodUnit)
    //   cy.get('.term-termination-rule-value').last().type(r.value)
    //   cy.get('.term-termination-rule-currency').last().select(r.currency)
    //
    //   if (i !== t.terminationRules.length - 1) cy.get('.add-termination-rule-btn').last().click()
    // })
    //
    if (i !== terms.length - 1) {
      cy.get('#add-termination-rule-btn').click()
      cy.get('.variant-btn').last().click()
    }
  })


})

Cypress.Commands.add('fillOfferOptions', (options) => {

  options.forEach(o => {
    const [btn, inputClass] = o.isEnabled ? ['#add-enabled-option-btn', '.enabled-option'] : ['#add-disabled-option-btn', '.disabled-option']

    cy.get(btn).click()
    cy.get(inputClass).last().type(o.title)
  })

})
Cypress.Commands.add('fillOfferPayment', (payment) => {

 payment.paymentStartOptions.forEach(pso => {

   if ( pso.isEnabled) {
     cy.get(`.${pso.type}`).click()
   }
 })
  if (payment.paymentTypeOptions[0].isEnabled) {
    cy.get(`.${payment.paymentTypeOptions[0].type}`).click()
    cy.get('.payment-price-affect').type(payment.paymentTypeOptions[0].priceAffect)
  }

})
Cypress.Commands.add('fillOfferAddress', (address) => {

  cy.get('#city').type(address.city)
  cy.get('#street').type(address.street)
  cy.get('#house').type(address.house)
  cy.get('#flat').type(address.flat)
  cy.get('#cadastralNumber').type(address.cadastralNumber)

})
Cypress.Commands.add('fillOfferMeta', (meta) => {
  cy.get('#propertyType').select(meta.propertyType)
})

//
Cypress.Commands.add('createOffer', () => {

  cy.intercept('POST', 'api/offers').as('Submit')

  cy.fixture('offer.json').then((offer) => {

    cy.fillOfferTerms(offer.terms)
    cy.get('.next-step').click();
    cy.fillOfferOptions(offer.options)
    cy.get('.next-step').click();
    cy.fillOfferPayment(offer.payment)
    cy.get('.next-step').click();
    cy.fillOfferAddress(offer.address)
    cy.fillOfferMeta(offer.meta)

    // -- Submit --
    cy.get('[type="submit"]').click()

    // cy.wait('@Submit').then(i => {
    //   cy.wrap(i.response.body.resourceId).as('OfferID');
    // })


  })

});

Cypress.Commands.add('insertOffer', () => {

  cy.fixture('offer.json').then((offer) => {


    cy.request({
        method: 'post',
        url: 'http://localhost:3333/api/offers',
        body: offer
      }
    ).as('OfferInsert')

    cy.get('@OfferInsert').then(i => {
      // @ts-ignore
      cy.wrap(i.body.resourceId).as('OfferID');
    })

    cy.get('@OfferID').then(offerId => {
      cy.visit(`/offers/${offerId}`)
    })

  })

})
Cypress.Commands.add('createContract', () => {

  cy.intercept('POST', 'api/contracts').as('Submit')

  // cy.get('.term').first().click()
  // cy.get('.rental-period-start').type('2022-10-09')
  // cy.get('.rental-period-end').type('2022-12-09')
  // cy.get('#create-contract').click()
  //
  // cy.wait('@Submit').then(i => {
  //   cy.wrap(i.response.body.resourceId).as('ContractID');
  // })
  //

})
Cypress.Commands.add('exportContract', (id: string) => {
  cy.visit(`http://localhost:4200/contracts/${id}`)
})

