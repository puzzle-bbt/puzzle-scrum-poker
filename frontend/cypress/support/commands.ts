import { DATA_ATTRIBUT_MARKER } from './constants';

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBySel: <E>(selector: string) => Chainable<JQuery<E>>;
    getBySelPrefix: <E>(selector: string) => Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add('getBySel', (selector: any, ...args: any[]) => {
  return cy.get(`[${DATA_ATTRIBUT_MARKER}=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelPrefix', (selector: any, ...args: any[]) => {
  return cy.get(`[${DATA_ATTRIBUT_MARKER}^=${selector}]`, ...args);
});
