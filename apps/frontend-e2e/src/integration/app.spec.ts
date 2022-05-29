
describe('frontend', () => {
  beforeEach(() => cy.visit('/offers/create'));

  it('should display welcome message', () => {

    cy.createOffer();
    cy.get('@OfferID').then(offerId => {
      cy.visit(`/offers/${offerId}`)
    })

  });
});
