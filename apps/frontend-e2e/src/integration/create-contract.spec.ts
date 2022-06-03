
describe('frontend', () => {
  beforeEach(() => cy.visit('/offers/create'));

  it('should display welcome message', () => {
    cy.insertOffer();
    cy.createContract()
    cy.get('@ContractID').then((contractID)=> {

      cy.exportContract(contractID.toString())
    })

    });
});
