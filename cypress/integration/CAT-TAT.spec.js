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
        cy.get('button[type="submit"]').click()
        cy.get('.success').should("be.visible")
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { 
        cy.get('#firstName').type("Matheus")
        cy.get('#lastName').type("Bonotto")
        cy.get('#email').type("matheusbonottogmail.com")
        cy.get('#open-text-area').type("longText", {delay: 0}) //delay -> velocidade da digitação
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
    })

    it('Verifica o campo telefone só aceita numeros', function() { 
        cy.get('#phone').type("Matheus").should("be.empty")
    })

    it('Verificar se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { 
        cy.get('#phone').type("Matheus").should("be.empty")
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
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
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() { 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
    })
    it.only('envia o formuário com sucesso usando um comando customizado', function() { 
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('button[type="submit"]').click()
        cy.get('.success').should("be.visible")
    })
  })
