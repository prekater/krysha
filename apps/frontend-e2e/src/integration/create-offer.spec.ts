import {
  createOfferPayload
} from '../fixtures/create-offer-payload'

describe('frontend', () => {
  beforeEach(() => {
    cy.visit('http://krisha.io')
    cy.viewport(1600, 900)
  });

  it('should display welcome message', () => {
    cy.createOffer();

    cy.wait('@Submit').then((r) => {
      expect(r.request.body).toEqual(createOfferPayload)
    });
    // cy.get('@OfferID').then((offerId) => {
    //   cy.visit(`/offers/${offerId}`)
    // })

  });
});
