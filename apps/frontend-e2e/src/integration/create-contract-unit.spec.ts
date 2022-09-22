describe('frontend', () => {
  beforeEach(() => {
    cy.intercept('http://ec2-3-94-232-213.compute-1.amazonaws.com:3333/api/offers/*', async (req) => {
      return req.reply({fixture: 'created-offer-response.json'})
    })
    cy.visit('/offers/123')
  });

  it('should display welcome message', () => {
    cy.createContract()

  });
});
