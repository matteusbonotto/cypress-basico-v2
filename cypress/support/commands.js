Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type("Matheus")
    cy.get('#lastName').type("Bonotto")
    cy.get('#email').type("matheusbonotto@gmail.com")
    cy.get('#open-text-area').type("longText") //delay -> velocidade da digitação
})