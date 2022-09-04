

describe('fill offer', () => {
  beforeEach(() => {
    cy.viewport(1600, 900)
    cy.visit('/offers/29d35a53-9827-466d-97b4-f302bccdc47d')
  });

  it('should display welcome message', () => {
    cy.createContract()
    cy.get('@ContractID').then((contractID)=> {

      cy.exportContract(contractID.toString())
    })

  });
});
