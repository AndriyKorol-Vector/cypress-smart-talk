/// <reference types="cypress" />

import { GeneralUrls } from "cypress/enums/urls";
import { Catalog, Navigation } from "cypress/support/controllers";

const productCatalog = new Catalog();
const navigation = new Navigation();

describe('[Custom Test Suite]', () => {
  beforeEach(function() {
    cy.log('GOG');
    cy.intercept('/'); 
    cy.visit('/');      
  })

  it('Verify an existing product in list of all products on the first page', () => {  

    // [Arrange]
    let productName = 'Kenshi';
    let products: [];
    let expectedProduct: any;

    //[Act]
    cy.request({
      method:'GET', 
      url: GeneralUrls.catalog + productCatalog.catalogPage1, 
      failOnStatusCode: false
    })      
    .then(result => {
      // [Accert]
      expect(result.status, 'respoce status').to.eq(200);        

      products = result.body.products;
        
      expect(products.length, 'products.length').to.not.eq(0); 
        
      expectedProduct = products.find((element: any) => {
          return element.title.includes(productName) 
        }); 
          
      expect(expectedProduct.title, 'product title').contain(productName);             
    });
  });  
  
  it('Verify an existing product in the menu', () => {  

    // [Arrange]
    let manuGroupName: string = 'bestsellers';
    let productName = 'Kenshi';
    let menuItems:any[];
    let expectedObjectOfMenuItem:any;
    let products:any[];
    let expectedProduct:any;    

    //[Act]
    cy.request({
      method:'GET', 
      url: GeneralUrls.menu + navigation.configuration, 
      failOnStatusCode: false
    })      
    .then(result => {
      // [Accert]
      expect(result.status, 'respoce status').to.eq(200);        

      menuItems = result.body;
        
      expect(Object.keys(menuItems).length, 'menuItems.length').to.not.eq(0);

      for (const key in menuItems) {
        if( key === manuGroupName){
          expectedObjectOfMenuItem = menuItems[key];
          break;
        };        
      }; 

      expect(expectedObjectOfMenuItem.products.length, 'expectedObjectOfMenuItem.products.length').to.not.eq(0);

      products = expectedObjectOfMenuItem.products;
      expectedProduct = products.find((element: any) => {
        return element.title.includes(productName); 
      }); 
         
      expect(expectedProduct.title, 'product title').contain(productName);              
    });     
  }); 
});