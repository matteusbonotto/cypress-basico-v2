// CAT-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { //Antes de cada teste executa aqui
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() { 
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })

    it('Preenche os campos obrigatórios e envia o formulario', function() { 
        const longText = 'testeasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdsstesteasdasdss';

        cy.get('#firstName').type("Matheus")
        cy.get('#lastName').type("Bonotto")
        cy.get('#email').type("matheusbonotto@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0}) //delay -> velocidade da digitação
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { 
        cy.get('#firstName').type("Matheus")
        cy.get('#lastName').type("Bonotto")
        cy.get('#email').type("matheusbonottogmail.com")
        cy.get('#open-text-area').type("longText", {delay: 0}) //delay -> velocidade da digitação
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Verifica o campo telefone só aceita numeros', function() { 
        cy.get('#phone').type("Matheus").should("be.empty")
    })

    it('Verificar se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { 
        cy.get('#phone').type("Matheus").should("be.empty")
        cy.get('#phone-checkbox').check()
        .should('be.checked')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() { 
        cy.get('#firstName').type("Matheus").should("have.value", "Matheus")
        cy.get('#lastName').type("Bonotto").should("have.value","Bonotto")
        cy.get('#email').type("matheusbonottogmail.com").should("have.value","matheusbonottogmail.com")
        cy.get('#phone').type("19995937087").should("have.value", "19995937087")
        cy.get('#open-text-area').type("longText", {delay: 0}) //delay -> velocidade da digitação
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()
        cy.get('#open-text-area').clear()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { 
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() { 
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produtoo (Youtube) por texto', function() { 
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produtoo (Mentoria) por value', function() { 
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produtoo (Blog) por index', function() { 
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca tipo de atendimento "feedback"', function() { 
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento"', function() { 
        cy.get('input[type="radio"]').check()
    })

    it('seleciona um produtoo (Blog) por index', function() { 
        cy.get('input[type="radio"]').check()
    })

    it('marca cada tipo de atendimento', function() { 
        cy.get('input[type="radio"]').check()
          .should('have.length', 3)
          .each(function(radio){
            cy.wrap(radio).check()
            cy.wrap(radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarcar o ultimo',function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixture',function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function(input){
            //console.log(input)
             expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo simulando um drag and drop',function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function(input){
          //console.log(input)
           expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function(input){
            //console.log(input)
             expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('Verifique se a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
          .should('have.attr', 'target', '_blank')
    })

    it('acessa a politica de privacidade removendo o atributo target e então clicando no link', function () {
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()
        
        cy.contains('Talking About Testing')
        .should('be.visible')
    })
  })
