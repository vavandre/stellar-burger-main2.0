import Cypress from 'cypress';

// Constants
const BASE_URL = 'https://norma.nomoreparties.space/api';
const SELECTORS = {
  BUN: `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`,
  ANOTHER_BUN: `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`,
  FILLING: `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`,
  ORDER_BUTTON: `[data-cy='order-button']`,
  OVERLAY: `[data-cy='overlay']`,
  MODAL: '#modals'
};

// API Interceptors
const setupInterceptors = () => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' });
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'user.json' });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'orderResponse.json' });
};

// Auth Helpers
const setupAuth = () => {
  window.localStorage.setItem('refreshToken', 'ipsum');
  cy.setCookie('accessToken', 'lorem');
  cy.getAllLocalStorage().should('be.not.empty');
  cy.getCookie('accessToken').should('be.not.empty');
};

const clearAuth = () => {
  window.localStorage.clear();
  cy.clearAllCookies();
  cy.getAllLocalStorage().should('be.empty');
  cy.getAllCookies().should('be.empty');
};

// Test Setup
beforeEach(() => {
  setupInterceptors();
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get(SELECTORS.MODAL).as('modal');
});

// Ingredient Tests
describe('Constructor Burger Tests', () => {
  describe('Ingredient Counter', () => {
    it('should increment ingredient counter', () => {
      cy.get(SELECTORS.FILLING).children('button').click();
      cy.get(SELECTORS.FILLING).find('.counter__num').contains('1');
    });
  });

  describe('Bun and Filling Operations', () => {
    it('should add bun and filling to order', () => {
      cy.get(SELECTORS.BUN).children('button').click();
      cy.get(SELECTORS.FILLING).children('button').click();
    });

    it('should add bun after filling', () => {
      cy.get(SELECTORS.FILLING).children('button').click();
      cy.get(SELECTORS.BUN).children('button').click();
    });
  });

  describe('Bun Replacement', () => {
    it('should replace bun with empty filling list', () => {
      cy.get(SELECTORS.BUN).children('button').click();
      cy.get(SELECTORS.ANOTHER_BUN).children('button').click();
    });

    it('should replace bun with existing fillings', () => {
      cy.get(SELECTORS.BUN).children('button').click();
      cy.get(SELECTORS.FILLING).children('button').click();
      cy.get(SELECTORS.ANOTHER_BUN).children('button').click();
    });
  });

  describe('Order Processing', () => {
    beforeEach(setupAuth);
    afterEach(clearAuth);

    it('should submit order and verify response', () => {
      cy.get(SELECTORS.BUN).children('button').click();
      cy.get(SELECTORS.FILLING).children('button').click();
      cy.get(SELECTORS.ORDER_BUTTON).click();
      cy.get('@modal').find('h2').contains('38483');
    });
  });

  describe('Modal Window Operations', () => {
    const openIngredientModal = () => {
      cy.get('@modal').should('be.empty');
      cy.get(SELECTORS.FILLING).children('a').click();
      cy.get('@modal').should('be.not.empty');
    };

    it('should open and display ingredient modal', () => {
      openIngredientModal();
      cy.url().should('include', '643d69a5c3f7b9001cfa0941');
    });

    it('should close modal via close button', () => {
      openIngredientModal();
      cy.get('@modal').find('button').click();
      cy.get('@modal').should('be.empty');
    });

    it('should close modal via overlay click', () => {
      openIngredientModal();
      cy.get(SELECTORS.OVERLAY).click({ force: true });
      cy.get('@modal').should('be.empty');
    });

    it('should close modal via Escape key', () => {
      openIngredientModal();
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('@modal').should('be.empty');
    });
  });
});
