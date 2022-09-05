describe('Fill contract', () => {

  // перед каждым выполнить
  beforeEach(() => {
    cy.viewport(1600, 900)
    cy.visit('/offers/29d35a53-9827-466d-97b4-f302bccdc47d')
  });

  it('should correctly fill data', () => {

    const date = '12.09.2022'
    cy.get('.term-picker').eq(1).click()
    cy.get('.next-button').click()

    cy.get('[name="deposit"]').eq(1).click()
    cy.get('.next-button').click()

    cy.get('.date-picker').click()
    cy.get('.calendar-block').should('be.visible')

    cy.get(`[data-date="${date}"]`).click()

    cy.get('.start-date').should(($startDate) => {
      expect($startDate).to.have.text(date)
    })

    cy.get('.Dropdown-control').click()
    cy.get('.Dropdown-option').eq(2).click()
    cy.get('.next-button').click()

    cy.get('[name="paymentStart"]').eq(1).click()
    cy.get('[name="paymentDivide"]').eq(1).click()

    cy.get('.next-button').click()


    cy.get('[name="employer-fullname"]').type('Иванов Иван Иванович')
    cy.get('[name="landlord-fullname"]').type('Петров Петр Петрович')
    cy.get('[name="landlord-email"]').type('kontaktAK@yandex.ru')
    cy.get('[name="employer-email"]').type('mchasov1@hotmail.com')

    cy.get('#create-contract').click()



    // cy.createContract()
    // cy.get('@ContractID').then((contractID)=> {
    //
    //   cy.exportContract(contractID.toString())
    // })

  });


});




