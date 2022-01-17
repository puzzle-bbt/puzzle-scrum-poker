import { OWN_PLAYER_MARKER, SCRUM_MASTER_NAME } from '../support/constants';

describe('scrum master', () => {
  it('onboarding', () => {
    cy.visit('/')
    cy.contains('Puzzle ScrumPoker');
    cy.getBySel('titel').contains('Puzzle ScrumPoker');

    cy.getBySel('username')
      .type(SCRUM_MASTER_NAME)
      .should('have.value', SCRUM_MASTER_NAME);

    cy.getBySel('onboarding-button')
      .contains('Erstellen')
      .click();
  });

  it('playerlist', () => {
    cy.log('--> Start call a ');
    cy.url().should('include', '/playground');

    cy.get('app-playerlist').contains(SCRUM_MASTER_NAME + OWN_PLAYER_MARKER);
    cy.getBySelPrefix('account-logo-').should('have.length', 1);
  });
})
