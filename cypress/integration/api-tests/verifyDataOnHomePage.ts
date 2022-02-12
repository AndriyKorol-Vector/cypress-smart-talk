/// <reference types="cypress" />

import { GeneralUrls } from "cypress/enums/urls";
import { Catalog, Navigation } from "cypress/support/controllers";
import { entries } from "cypress/types/lodash";

const catalog = new Catalog();
const navigation = new Navigation();

describe('[Custom Test Suite]', () => {
  beforeEach(function() {
    cy.log('GOG');
    cy.intercept('/'); 
    cy.visit('/');      
  })

  it('Verify an existing product in list of all products', () => {    
    // [Arrange]
    let productName = 'Kenshi';

    //[Act]
    cy.request({
      method:'GET', 
      url: GeneralUrls.catalog + catalog.catalogAll, 
      failOnStatusCode: false
    })      
    .then(result => {
      // [Accert]
      expect(result.status, 'respoce status').to.eq(200);        

      let products = result.body.products;

      // [Accert]     
      expect(products.length, 'products.length').to.not.eq(0); 
        
      let expectedProduct = products.find((element: any) => {
          return element.title.includes(productName) 
        }); 

      // [Accert]      
      expect(expectedProduct.title, 'product title').contain(productName);             
    });     
  });  
  
  it('Verify an existing product in the menu', () => {    
    // [Arrange]
    let productName = 'Kenshi';

    //[Act]
    cy.request({
      method:'GET', 
      url: GeneralUrls.menu + navigation.configuration, 
      failOnStatusCode: false
    })      
    .then(result => {
      // [Accert]
      expect(result.status, 'respoce status').to.eq(200);        

      let menuItems = result.body;
      let expectedObjectOfMenuItem:any;

        
      expect(menuItems.length, 'menuItems.length').to.not.eq(0);

      for (const key in menuItems) {
        if( key === 'bestsellers'){
          expectedObjectOfMenuItem = menuItems[key];
          break;
        };        
      }; 

      expect(expectedObjectOfMenuItem.products.length, 'expectedObjectOfMenuItem.products.length').to.not.eq(0);

      let products = expectedObjectOfMenuItem.products
      let expectedProduct = products.find((element: any) => {
        return element.title.includes(productName); 
      }); 

         
      expect(expectedProduct.title, 'product title').contain(productName);              
    });     
  }); 
});