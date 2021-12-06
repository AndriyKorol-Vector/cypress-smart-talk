/// <reference types="cypress" />

describe('[Custom Test Suite]', () => {
  beforeEach(function() {
    cy.log('GOG')
    cy.intercept('/') 
    cy.visit('/')      
  })

  it('Verify an existing product in GOG', () => {      
      cy.request('/games/ajax/filtered?mediaType=game&page=1&sort=popularity')      
      .then(result => {        
        expect(result.status).to.eq(200);        

        let products = result.body.products 
        expect(products.length).to.not.eq(0); 
          
        let p = products.find((element: any) => {
           return element.title.includes('Drakensang')     
        });   
        expect(p.title).contain("Drakensang");             
      })      
  })  
})


