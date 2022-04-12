/// <reference types="cypress" />

context("Home", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it('find welcome page and report', () => {
        cy.get('h1').contains("Mecha Data List")
    })
    it('find ascending sort button', () => {
        cy.get('button').contains('Sort Ascending')
    })
    it('find descending sort button', () => {
        cy.get('button').contains('Sort Descending')
    })
    it('click ascending sort', () => {
        cy.get('.ascending-button').click()
    })
    it('click descending sort', () => {
        cy.get('.descending-button').click()
    })
    it('click Update button', () => {
        cy.get('Button').contains('Update').click()
    })
    it('click View button', () => {
        cy.get('Button').contains('View').click()
    })
    it('click Create Entry', () => {
        cy.get('a').contains('Create Entry').click()
    })
    it('Check api response for List', () => {
        cy.request('http://localhost:3000/api/notes'). as('GundamNotes')
    })
})

export {}