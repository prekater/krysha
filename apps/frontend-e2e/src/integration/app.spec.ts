
describe('frontend', () => {
  beforeEach(() => cy.visit('/offers/create'));

  it('should display welcome message', () => {
    cy.createOffer();

  });
});
