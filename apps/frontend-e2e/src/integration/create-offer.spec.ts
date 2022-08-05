import * as offerPayload from '../fixtures/create-offer-payload.json'

describe('frontend', () => {
  beforeEach(() => cy.visit('/offers/create'));

  it('should display welcome message', () => {
    cy.createOffer();

    cy.wait('@Submit').then((r) => {
      expect(JSON.stringify(r.request.body)).to.equal(JSON.stringify(offerPayload['default']))
    });
    // cy.get('@OfferID').then((offerId) => {
    //   cy.visit(`/offers/${offerId}`)
    // })

  });
});
